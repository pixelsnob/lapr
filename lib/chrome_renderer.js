
'use strict';

const db = require('../models');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

var browser, page, started = false;

// move this
const getData = async () => {
  let data = {};
  const model_names = {
    'products':            'Product',
    'product_categories':  'ProductCategory',
    'makers':              'Maker',
    'tags':                'Tag',
    'tag_categories':      'TagCategory',
    'youtube_videos':      'YoutubeVideo',
    'images':              'Image',
    'content_blocks':      'ContentBlock'
  }; 
  for (let model_name of Object.keys(model_names)) {
    const docs = await db.model(model_names[model_name]).find(
      {},
      { __v: 0 },
      { sort: { name: 1 }}
    );
    data[model_name] = docs.map(doc => {
      // Send only fields that are in the model
      var fields = Object.keys(db.model(model_names[model_name]).schema.paths);
      var new_doc = {};
      fields.forEach(field => {
        if (typeof doc[field] != 'undefined') {
          new_doc[field] = doc[field];
        }
      });
      return new_doc;
    });
  }
  return data;
};

const getBrowser = async (req, res) => {

  if (!started) {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page.setRequestInterception(false);
    //page.on('request', request => {
    //  // Skip loading images server-side
    //  if (request.url().endsWith('.jpg') || request.url().endsWith('.png')) {
    //    request.abort();
    //    return null;
    //  }
    //  request.continue();
    //});

    page.on('error', err => {
      console.error(err._args);
    });
    page.on('pageerror', err => {
      console.error(err);
    });
    page.on('console', async msg => {
      console.log(msg);
      const jsonArgs = await Promise.all(msg.args().map(arg => arg.jsonValue()));
      console.log('Headless browser log:', ...jsonArgs);

    });

    await page.goto('http://127.0.0.1:3003/layout.html', { /*waitUntil: 'networkidle2'*/ });

    await page.evaluate(data => {
      window.__lapr_ssr = true;
      window.localStorage.setItem('data', data);
    }, JSON.stringify(await getData()));

    await page.addScriptTag({ url: '/dist/webcomponents/template.js' });
    await page.addScriptTag({ url: '/dist/js/main.js' });

    await page.evaluate(() => {
      // more specific?
      Array.from(document.querySelectorAll('script')).forEach($script => {
        $script.setAttribute('defer', 'defer');
      });
    });
    started = true;

  }

  await page.evaluate(async (path, csrf_param) => {
    var lapr_script = document.querySelector('#lapr-script');
    if (!lapr_script) {
      lapr_script = document.createElement('script');
      lapr_script.id = 'lapr-script';
      document.head.appendChild(lapr_script);
    }
    lapr_script.innerText = `window.__lapr_locals = { csrf_param: '${csrf_param}' }`;
    
    return window.__lapr_dispatch(path);
  }, req.path, res.locals.csrf_param);

  return { browser, page };
};

// Middleware
module.exports = async function(req, res, next) {
  try {
    const { browser, page } = await getBrowser(req, res);
    const out = await page.content();
    res.send(out);
    //await page.removeAllListeners();
    //await page.close();
  } catch (err) {
    next(err);
  }
}


