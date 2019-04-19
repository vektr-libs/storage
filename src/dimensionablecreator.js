function createDimensionable(utillib,mylib){
  'use strict';
  function Dimensionable(svgel){
    this.dimensions = [utillib.readSVGAnimatedLength(svgel.width)||0,utillib.readSVGAnimatedLength(svgel.height)||0];
  }
  Dimensionable.prototype.__cleanUp = function(){
    this.dimensions = null;
  };
  mylib.Dimensionable = Dimensionable;
}

module.exports = createDimensionable;
