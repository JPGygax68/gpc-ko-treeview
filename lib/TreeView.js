"use strict";

var ko = require('knockout');

var Defs = require('./Defs');
var Node = require('./Node');

/* TreeView view-model
 */
function TreeView(model, options) {

  // TODO: formally separate run-time options from import options ?
  this.options = options || {};
  
  this.showRoot = ko.observable(false);
  this.showValueColumn = ko.observable(false);
  this.labelColumnWidth = ko.observable(Defs.DEFAULT_LABEL_COLUMN_WIDTH);

  this.rootNode = Node.fromModel(model, this, options);
}

// TODO: provide factory methods instead ?
TreeView.Node = Node;

module.exports = TreeView;