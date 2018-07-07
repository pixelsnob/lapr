
'use strict';

const db = require('../models');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
//const data = require('./db_to_json');

var browser, page, started = false;

const getBrowser = async (req, res) => {

  if (!started) {
    // This block runs only once: on startup.
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

    await page.evaluate(() => window.__lapr_ssr = true);

    await page.addScriptTag({ url: '/dist/webcomponents/template.js' }); // ie only?
    await page.addScriptTag({ url: '/dist/js/main.js' });

    await page.evaluate(() => {
      // more specific?
      Array.from(document.querySelectorAll('script')).forEach($script => {
        $script.setAttribute('defer', 'defer');
      });
    });
    started = true;

  }

  // Pass config data, auth status, etc.
  await page.evaluate(async (path, csrf_param, data) => {
    var lapr_script = document.querySelector('#lapr-script');
    if (!lapr_script) {
      lapr_script = document.createElement('script');
      lapr_script.id = 'lapr-script';
      document.head.appendChild(lapr_script);
    }
    lapr_script.innerText = `window.__lapr_locals = { csrf_param: '${csrf_param}' }`;
    
    // Run
    return window.__lapr_dispatch(path, data);

  }, req.path, res.locals.csrf_param, res.locals.json_data);

  return { browser, page };
};

// Middleware
module.exports = async function(req, res, next) {
  try {
    const { browser, page } = await getBrowser(req, res);
    const out = await page.content();

    res.send(out);

  } catch (err) {
    console.error(err);
    next(err);
  }
}


