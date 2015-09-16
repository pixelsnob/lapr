/**
 * Backs up each model's data to a JSON file and attempts to commit to 
 * a git repo
 * 
 */

'use strict';

var db          = require('../models'),
    util        = require('util'),
    path        = require('path'),
    dir         = path.resolve(__dirname, '../var/lapr-db'),
    async       = require('async'),
    exec        = require('child_process').exec,
    exec_opts   = { cwd: dir },
    git         = require('nodegit');

async.waterfall([
  function(next) {
    // Loop over every model, and export data as JSON
    async.eachSeries(Object.keys(db.models), function(model, cb) {
      var model_name  = db.models[model].modelName,
          coll_name   = db.models[model].collection.collectionName,
          str         = 'mongoexport -d lapr -c %s -o %s/%s.json --jsonArray --pretty',
          cmd         = util.format(str, coll_name, dir, model_name);
      exec(cmd, function(err, stdout, stderr) {
        if (err) {
          return cb(err);
        }
        if (stderr) {
          console.log(stderr);
        }
        cb();
      });
    }, next); 
  },
  function(next) {
    // Attempt a commit
    exec('git commit -a -m "Automated backup"', exec_opts, function(err, stdout, stderr) {
      if (err) {
        return next(err);
      }
      console.log(stdout, stderr);
      next();
    });
  },
  function(next) {
    // Attempt a push
    exec('git push', exec_opts, function(err, stdout, stderr) {
      if (err) {
        return next(err);
      }
      console.log(stdout, stderr);
      next();
    });
  }
], function(err) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  console.log('Done!');
  process.exit(0);
});


