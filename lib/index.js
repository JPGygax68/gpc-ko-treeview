/**
  GPC.TreeView view loader/injector for consumption by browserify.
 */
"use strict";

var _ = require('underscore');

var TreeView = require('./TreeView'); // obtain the view-model

// Get and collect the Knockout templates
var templates = {
  "root": require('./root.jade')({}),
  "node": require('./node.jade')({}),
  "node-children": require('./node-children.jade')({})
};

// Get the CSS code
var css = require('./style.styl');

document.addEventListener('DOMContentLoaded', function() {

  // TODO: create a module in a separate package for this ("gpc-ko-loader" ?)
  var prefix = 'GPC.TreeView:'; // TODO: make this into a parameter
  
  var head = document.getElementsByTagName('head')[0];
  
  // Add the CSS code
  var elem = document.createElement('style');
  elem.setAttribute('type', 'text/css');
  elem.textContent = css;
  head.appendChild(elem);
  
  // Add the Knockout templates
  _.each(templates, function(template, name) {
    var elem = document.createElement('script');
    elem.setAttribute('id', prefix + name);
    elem.setAttribute('type', 'text/html');
    elem.textContent = template;
    head.appendChild(elem);
  });
});

module.exports = TreeView; // return the view-model
