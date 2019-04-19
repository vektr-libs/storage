function createCircle(lib,utillib,mylib){
  'use strict';
  function Circle(cb,svgel,parnt){
    mylib.Shape.call(this,svgel,parnt);
    this.center = [utillib.readSVGAnimatedLength(svgel.cx)||0, utillib.readSVGAnimatedLength(svgel.cy)||0];
    this.radius = utillib.readSVGAnimatedLength(svgel.r)||0;
    cb(this);
  }
  lib.inherit(Circle,mylib.Shape);
  Circle.prototype.__cleanUp = function(){
    this.center = null;
    this.radius = null;
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.Areable.prototype.__cleanUp.call(this);
  };
  Circle.prototype.tagName = function(){
    return 'circle';
  };
  mylib.Circle = Circle;
}

module.exports = createCircle;
