function createLine (HERS, utillib, mylib) {
  'use strict';
  function Line(cb,svgel,parnt){
    mylib.PolyLine.call(this,cb,svgel,parnt);
  }
  HERS.inherit(Line,mylib.PolyLine);
  Line.prototype.readPoints = function(svgel){
    this.onPoint({
      x: utillib.readSVGAnimatedLength(svgel.x1)||0, 
      y: utillib.readSVGAnimatedLength(svgel.y1)||0
    });
    this.onPoint({
      x: utillib.readSVGAnimatedLength(svgel.x2)||0, 
      y: utillib.readSVGAnimatedLength(svgel.y2)||0
    });
  };
  Line.prototype.tagName = function(){
    return 'line';
  };
  mylib.Line = Line;
}

module.exports = createLine;

