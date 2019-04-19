function createGroup(lib,mylib){
  'use strict';
  function Group(cb,svgel,parnt){
    this.__parent = parnt;
    mylib.SvgParent.call(this,cb,svgel);
    mylib.Shape.call(this,svgel,parnt);
  }
  lib.inherit(Group,mylib.SvgParent);
  Group.prototype.assignStyle = mylib.Stylable.prototype.assignStyle;
  Group.prototype.set_fill = mylib.Stylable.prototype.set_fill;
  Group.prototype.set_stroke = mylib.Stylable.prototype.set_stroke;
  Group.prototype.tagName = function(){
    return 'g';
  };
  Group.prototype.__cleanUp = function(){
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.SvgParent.prototype.__cleanUp.call(this);
  };
  mylib.Group = Group;
}

module.exports = createGroup;
