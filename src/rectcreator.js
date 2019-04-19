function createRect(lib,utillib,mylib){
  'use strict';
  function Rect(cb,svgel,parnt){
    mylib.Areable.call(this,svgel);
    mylib.Shape.call(this,svgel,parnt);
    this.rounding = [utillib.readSVGAnimatedLength(svgel.rx), utillib.readSVGAnimatedLength(svgel.ry)];
    if(!this.rounding[1] && this.rounding[0]){
      this.rounding[1] = this.rounding[0];
    }
    if(!this.rounding[0] && this.rounding[1]){
      this.rounding[0] = this.rounding[1];
    }
    cb(this);
  }
  lib.inherit(Rect,mylib.Shape);
  Rect.prototype.__cleanUp = function(){
    this.rounding = null;
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.Areable.prototype.__cleanUp.call(this);
  };
  Rect.prototype.tagName = function(){
    return 'rect';
  };
  mylib.Rect = Rect;
}

module.exports = createRect;
