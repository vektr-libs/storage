function createGradient(lib,utillib,hierarchylib,mylib){
  'use strict';
  function addStop(no,tr){
    var offset;
    if(typeof tr.offset !== 'undefined'){
      offset = utillib.readSVGAnimatedNumber(tr.offset);
      if(offset>1){no.normalize=true;}
      if(tr.style.getPropertyValue('stop-color')){
        this.stops.push([offset,utillib.colorOrLink(tr.style,'stop-color','stop-opacity')]);
      }else{
        this.stops.push([offset,utillib.colorOrLink(tr.attributes,'stop-color','stop-opacity')]);
      }
    }
  }
  function normalizeStop(stop){
    stop[0] /= 100.0;
  }
  function Gradient(svgel,parnt){
    this.id = svgel.id;
    lib.Destroyable.call(this,parnt);
    hierarchylib.StaticChild.call(this,parnt);
    this.stops = [];
    this.parentGradient = null;
    this.transformMatrix = utillib.readTransform(svgel.gradientTransform);
    //normalize is a fix for IE that happens to report offsets in [0-100] range
    var no = {normalize:false};
    utillib.traverseCollection(svgel.childNodes,addStop.bind(this,no),'length','item');
    if(no.normalize){
      this.stops.forEach(normalizeStop);
    }
    if(svgel.href && svgel.href.baseVal && svgel.href.baseVal.length && parnt && parnt.onResolveNeeded){
      parnt.onResolveNeeded(this,'parentGradient',utillib.readSVGUseLink(svgel.href));
    }
  }
  Gradient.prototype.__cleanUp = function(){
    this.id = null;
    this.stops = null;
    this.parentGradient = null;
    this.transformMatrix = null;
    hierarchylib.StaticChild.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  Gradient.prototype.set_parentGradient = function (pg) {

    /*
    console.trace();
    console.log(this.id, 'setting parent gradient', pg ? pg.id : 'bas nista');
    */

    this.parentGradient = pg;
  };
  mylib.Gradient = Gradient;
}

module.exports = createGradient;
