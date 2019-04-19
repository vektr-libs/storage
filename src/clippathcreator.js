function createClipPath(lib,mylib){
  'use strict';
  function ClipPath(cb,svgel,parnt){
    mylib.Shape.call(this,svgel,parnt);
    mylib.SvgParent.call(this,cb,svgel);
  }
  lib.inherit(ClipPath,mylib.SvgParent);
  ClipPath.prototype.assignStyle = mylib.Stylable.prototype.assignStyle;
  ClipPath.prototype.set_fill = mylib.Stylable.prototype.set_fill;
  ClipPath.prototype.set_stroke = mylib.Stylable.prototype.set_stroke;
  ClipPath.prototype.__cleanUp = function(){
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.SvgParent.prototype.__cleanUp.call(this);
  };
  mylib.ClipPath = ClipPath;
}

module.exports = createClipPath;
