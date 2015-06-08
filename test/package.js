'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var assert = require('chai').assert;
var package_path = path.join(__dirname, 'fixtures', 'package.json');
var original_package = fs.readFileSync(package_path, 'utf-8');

/**
 * Creates a copy of the key/value pair hash `process.env`
 *
 * The copy is useful for forking child processes with a modified environment variable list
 */
function cloneEnv(default_env) {
  var clone = default_env || {};

  Object.keys(process.env).forEach(function(key) {
    clone[key] = process.env[key];
  });

  return clone;
}

describe('When on a build environment', function() {
  var cloned_env;

  before(function() {
    cloned_env = cloneEnv();
  });

  after(function(done) {
    fs.writeFile(package_path, original_package, 'utf-8', done);
  });

  describe('When SOURCE_VERSION is not set', function() {
    it('does not modify the package.json file', function(done) {
      delete cloned_env.SOURCE_VERSION;

      exec(
        path.join('..', 'bin', 'update-package') + ' ' + package_path,
        {
          encoding: 'utf-8', 
          cwd: __dirname,
          env: cloned_env
        }, 
        function(err, stdout, stderr) {
          if (!err) {
            var new_package = fs.readFileSync(package_path, 'utf-8');
            var json = JSON.parse(new_package);

            assert.equal(original_package, new_package);
          }

          done(err);
        }
      )
    })
  });

  describe('When SOURCE_VERSION is set', function() {
    it('updates the package.json file as a post build step', function(done) {
      var version = 'abc123';
      cloned_env.SOURCE_VERSION = version;

      exec(
        path.join('..', 'bin', 'update-package') + ' ' + package_path,
        {
          encoding: 'utf-8', 
          cwd: __dirname, 
          env: cloned_env
        }, 
        function(err, stdout, stderr) {
          if (!err) {
            var new_package = fs.readFileSync(package_path, 'utf-8');
            var json = JSON.parse(new_package);

            assert.equal(version, json.build);
          }

          done(err);
        }
      )
    })    
  });
});