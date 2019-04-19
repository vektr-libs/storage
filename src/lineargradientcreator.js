function createLinearGradient(lib,utillib,mylib){
  'use strict';
  function LinearGradient(cb,svgel,parnt){
    mylib.Gradient.call(this,svgel,parnt);
    this.vector = [
      utillib.readSVGAnimatedLength(svgel.x1)||0,
      utillib.readSVGAnimatedLength(svgel.y1)||0,
      utillib.readSVGAnimatedLength(svgel.x2)||0,//'100%',
      utillib.readSVGAnimatedLength(svgel.y2)||0
    ];
    cb(this);
  }
  lib.inherit(LinearGradient,mylib.Gradient);
  LinearGradient.prototype.tagName = function(){
    return 'linearGradient';
  };
  mylib.LinearGradient = LinearGradient;
}

module.exports = createLinearGradient;
