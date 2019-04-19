function createDefs(lib, hierarchylib, mylib){
  'use strict';
  function Defs(cb,svgel,parnt){
    this.id = svgel.id;
    hierarchylib.StaticChild.call(this,parnt);
    mylib.SvgParent.call(this,cb,svgel);
  }
  lib.inherit(Defs,mylib.SvgParent);
  Defs.prototype.tagName = function(){
    return 'defs';
  };
  Defs.prototype.__cleanUp = function(){
    this.id = null;
    mylib.SvgParent.prototype.__cleanUp.call(this);
    hierarchylib.StaticChild.prototype.__cleanUp.call(this);
  };
  mylib.Defs = Defs;
}

module.exports = createDefs;
