function createStatik(lib,mylib){
  'use strict';
  function Statik(cb,svgel,parnt){
    mylib.Group.call(this,cb,svgel,parnt);
  }
  lib.inherit(Statik,mylib.Group);
  mylib.Statik = Statik;
}

module.exports = createStatik;
