'use strict';

// Polyfill for Node 22+ where util.isRegExp was removed (used by grunt-contrib-cssmin deps)
var util = require('util');
if (typeof util.isRegExp !== 'function') {
  util.isRegExp = function (arg) {
    return Object.prototype.toString.call(arg) === '[object RegExp]';
  };
}

module.exports = function(grunt) {
  var _ = require('underscore');
  // Project Configuration
  var assets = grunt.file.readJSON('assets.json');
  grunt.initConfig({
    assets: assets,
    uglify: {
      main: {
        options: {
          mangle: false,
          compress: true
        },
        files: (function() {
          var o = {};
          _.each(assets, function(value, key) {
            _.each(value.js, function(value, key) {
              o[key] = value;
            });
          });
          return o;
        })()
      }
    },
    cssmin: {
      main: {
        files: (function() {
          var o = {};
          _.each(assets, function(value, key) {
            _.each(value.css, function(value, key) {
              o[key] = value;
            });
          });
          return o;
        })()
      }
    },
    watch: {
      partials: {
        files: ['assets.json', 'gruntfile.js'],
        tasks: ['jade'],
        options: {
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['cssmin', 'uglify']);
  
};
