function createShape(lib,utillib,hierarchylib,mylib){
  'use strict';
  function Shape(svgelement,parnt){
    hierarchylib.StaticChild.call(this,parnt);
    this.id = svgelement.id;
    mylib.Stylable.call(this,svgelement);
    this.clipPath = null;
    this.transformMatrix = utillib.readTransform(svgelement.transform);
  }
  lib.inherit(Shape,mylib.Stylable);
  Shape.prototype.__cleanUp = function(){
    this.transformMatrix = null;
    if(this.clipPath){
      this.clipPath.destroy();
    }
    this.clipPath = null;
    mylib.Stylable.prototype.__cleanUp.call(this);
    this.id = null;
    hierarchylib.StaticChild.prototype.__cleanUp.call(this);
  };
  mylib.Shape = Shape;
}

module.exports = createShape;

