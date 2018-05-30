
'use strict';

const db = require('../models');
const markdown = require('./marked');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

var browser, page, layout, started = false;

const getLayout = () => {
  if (!layout) {
    // use jade instead?
    return fs.readFileSync(path.resolve('views/layout.html'), 'utf8');
  }
  return layout;
};

const getBrowser = async (req, res, content) => {

  if (started) {
    /*await page.evaluate(data => { // <<<< keeps data fresh
      window.__lapr_data = data;
    }, data);*/
    return { browser, page };
  }

  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();

  await page.setContent(content);

  await page.setRequestInterception(true);
  page.on('request', page_req => {
    //console.log(req.url());
    //if (page_req.resourceType() == 'document') {
      return page_req.continue();
    //}
    //page_req.abort();
  });
  
  page.on('error', err => {
    console.error(err);
  });
  page.on('pageerror', err => {
    console.error(err);
  });
  page.on('console', async msg => {
    console.log(msg.text());
    const jsonArgs = await Promise.all(msg.args().map(arg => arg.jsonValue()));
    console.log('Headless browser log:', ...jsonArgs);
  });

  started = true;

  await page.evaluate(data => {
    window.__lapr_data = data;
    window.__lapr_ssr = true;
  }, res.locals.json_data);
  await page.addScriptTag({ url: `${res.locals.base_url}jade.js` });
  await page.addScriptTag({ url: `${res.locals.base_url}dist/js/main.js` });
  
  // Kludge: first render won't contain data unless we wait
  await page.waitFor(500);

  return { browser, page };
};

// Middleware
module.exports = async function(req, res, next) {
  try {
    const { browser, page } = await getBrowser(req, res, getLayout());
    // User auth
    if (req.isAuthenticated()) { // move all of this to client
      // change to window.__lapr_user
      // add check to prevent multiple script/style tags
      await page.addScriptTag({ content: `window.lapr.user = '${res.locals.user.username}'` }); 
      // Add admin CSS
      await page.addStyleTag({ url: `${res.locals.base_url}dist/css/admin.css` });
    }
    // CSRF token
    await page.evaluate(token => {
      document.querySelector('meta[name="csrf-param"]').setAttribute('content', token);
    }, res.locals.csrf_param);

    // Run front-end code using the path passed by express
    await page.evaluate(path => {
      Backbone.history.navigate(path, { trigger: true, silent: false, replace: false });
    }, req.path);

    const out = await page.content();
    res.send(out);
  } catch (err) {
    next(err);
  }
}


