function createUse(lib,utillib,mylib){
  'use strict';
  function Use(cb,svgel,parnt){
    mylib.Shape.call(this,svgel,parnt);
    mylib.Areable.call(this,svgel);
    this.usedObj = null;
    if(parnt && parnt.onResolveNeeded){
      parnt.onResolveNeeded(this,'usedObj',utillib.readSVGUseLink(svgel.href));
    }
    cb(this);
  }
  Use.prototype.assignStyle = mylib.Stylable.prototype.assignStyle;
  Use.prototype.set_fill = mylib.Stylable.prototype.set_fill;
  Use.prototype.set_stroke = mylib.Stylable.prototype.set_stroke;
  Use.prototype.tagName = function(){
    return 'use';
  };
  Use.prototype.__cleanUp = function(){
    this.usedObj = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylib.Shape.prototype.__cleanUp.call(this);
  };
  mylib.Use = Use;
}

module.exports = createUse;
