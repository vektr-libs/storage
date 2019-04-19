function createPolyline (lib,utillib,mylib){
  'use strict';
  function PolyLine(cb,svgel,parnt){
    mylib.Areable.call(this,svgel);
    mylib.Shape.call(this,svgel,parnt);
    this.points = [];
    this.pos[0] = Infinity;
    this.pos[1] = Infinity;
    this.readPoints(svgel);
    cb(this);
  }
  lib.inherit(PolyLine,mylib.Shape);
  PolyLine.prototype.readPoints = function(svgel){
    utillib.traverseSvgCollection(svgel.animatedPoints,this.onPoint.bind(this));
  };
  PolyLine.prototype.onPoint = function(point){
    this.points.push([point.x,point.y]);
    if(this.pos[0]>point.x){
      this.pos[0] = point.x;
    }
    if(this.pos[1]>point.y){
      this.pos[1] = point.y;
    }
    if(this.pos[0]+this.dimensions[0]<point.x){
      this.dimensions[0] = point.x-this.pos[0];
    }
    if(this.pos[1]+this.dimensions[1]<point.y){
      this.dimensions[1] = point.y-this.pos[1];
    }
  };
  PolyLine.prototype.__cleanUp = function(){
    this.points = null;
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.Areable.prototype.__cleanUp.call(this);
  };
  PolyLine.prototype.tagName = function(){
    return 'polyline';
  };
  mylib.PolyLine = PolyLine;
}

module.exports = createPolyline;
