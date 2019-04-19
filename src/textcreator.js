function createText(lib,utillib,mylib){
  'use strict';
  function Text(cb,svgel,parnt){
    mylib.Positionable.call(this,svgel);
    mylib.Shape.call(this,svgel,parnt);
    var dx = utillib.readSVGAnimatedLength(svgel.dx), dy = utillib.readSVGAnimatedLength(svgel.dy);
    this.displacement = (dx===null && dy === null) ? null : [dx,dy];
    this.assignStyle('fontSize',svgel.style.getPropertyValue('font-size'));
    this.assignStyle('fontStyle',svgel.style.getPropertyValue('font-style'));
    this.assignStyle('fontWeight',svgel.style.getPropertyValue('font-weight'));
    this.assignStyle('fontFamily',svgel.style.getPropertyValue('font-family'));
    this.assignStyle('fontVariant',svgel.style.getPropertyValue('font-variant'));
    this.assignStyle('lineHeight',svgel.style.getPropertyValue('line-height'));
    this.assignStyle('letterSpacing',svgel.style.getPropertyValue('letter-spacing'));
    this.assignStyle('textAlign',svgel.style.getPropertyValue('text-align'));
    this.assignStyle('textAnchor',svgel.style.getPropertyValue('text-anchor'));
    this.text = svgel.textContent;
    cb(this);
  }
  lib.inherit(Text,mylib.Shape);
  Text.prototype.__cleanUp = function(){
    this.displacement = null;
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.Positionable.prototype.__cleanUp.call(this);
  };
  Text.prototype.tagName = function(){
    return 'text';
  };
  mylib.Text = Text;
}

module.exports = createText;
