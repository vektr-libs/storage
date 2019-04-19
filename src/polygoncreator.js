function createPolygon(lib,mylib){
  'use strict';
  function Polygon(cb,svgel,parnt){
    mylib.PolyLine.call(this,cb,svgel,parnt);
  }
  lib.inherit(Polygon,mylib.PolyLine);
  Polygon.prototype.tagName = function(){
    return 'polygon';
  };
  mylib.Polygon = Polygon;
}

module.exports = createPolygon;
