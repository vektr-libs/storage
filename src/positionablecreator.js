function createPositionable(utillib,mylib){
  'use strict';
  function Positionable(svgel){
    this.pos = [utillib.readSVGAnimatedLength(svgel.x)||0, utillib.readSVGAnimatedLength(svgel.y)||0];
  }
  Positionable.prototype.__cleanUp = function(){
    this.pos = null;
  };
  mylib.Positionable = Positionable;
}

module.exports = createPositionable;
