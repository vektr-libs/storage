function createRadialGradient(lib,utillib,mylib){
  'use strict';
  function RadialGradient(cb,svgel,parnt){
    mylib.Gradient.call(this,svgel,parnt);
    var fx = utillib.readSVGAnimatedLength(svgel.fx),
      fy = utillib.readSVGAnimatedLength(svgel.fy),
      cx = utillib.readSVGAnimatedLength(svgel.cx),
      cy = utillib.readSVGAnimatedLength(svgel.cy),
      r = utillib.readSVGAnimatedLength(svgel.r);
    /* stupid
    this.radials=[
      fx||cx||'50%',
      fy||cy||'50%',
      0,
      cx||'50%',
      cy||'50%',
      r||'50%'
    ];
    */
    this.radials = [
      fx||cx,
      fy||cy,
      0,
      cx,
      cy,
      r
    ];
    cb(this);
  }
  lib.inherit(RadialGradient,mylib.Gradient);
  RadialGradient.prototype.tagName = function(){
    return 'radialGradient';
  };
  mylib.RadialGradient = RadialGradient;
}

module.exports = createRadialGradient;

