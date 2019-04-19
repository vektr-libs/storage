function createSvg(lib,utillib,commonlib,hierarchylib,mylib){
  'use strict';
  function Svg(svgel,cb,progresscb){
    this.id = svgel.id;
    var now = (new Date()).getTime();
    lib.Destroyable.call(this);
    hierarchylib.StaticParent.call(this);
    mylib.Dimensionable.call(this,svgel);
    this.statik = null;
    //this.__elementsById = {};
    this.__elementsById = new lib.Map();
    var chldload = {start:now,target:svgel.childNodes.length,loaded:0,skipped:0};
    if(svgel.childNodes.length){
      utillib.traverseCollection(svgel.childNodes,this.produceAndAddFrom.bind(this,chldload,cb,progresscb),'length','item');
    }else{
      this.onChildrenProduced(chldload,cb);
    }
  }
  lib.inherit(Svg,hierarchylib.StaticParent);
  Svg.prototype.addChild = function(chld){
    if(chld.id==='static'){
      this.statik = chld;
      commonlib.set(chld,'__parent',this);
      return chld;
    }else{
      return hierarchylib.StaticParent.prototype.addChild.call(this,chld);
    }
  };
  Svg.prototype.onChildrenProduced = function(chldload,cb){
    /*
    console.log(this.id,'load done in',(new Date()).getTime()-chldload.start,Object.keys(this.__elementsById).length,'objects stored');
    lib.traverse(this.__elementsById,this.checkElementById.bind(this,this.__elementsById));
    this.__elementsById = {}; //reset after load
    */
    console.log(this.id,'load done in',(new Date()).getTime()-chldload.start,this.__elementsById.count,'objects stored');
    this.__elementsById.traverse(this.checkElementById.bind(this,this.__elementsById));
    this.__elementsById.destroy();
    mylib.SvgParent.prototype.onChildrenProduced.call(this,chldload,cb);
  };
  Svg.prototype.onChildProduced = function(chldload,cb,progresscb,chld){
    if(chld){
      if('function' === typeof chld.traverseChildrenAfter){
        chld.traverseChildrenAfter(this.registerObject.bind(this));
      }else{
        this.registerObject(chld);
      }
    }
    mylib.SvgParent.prototype.onChildProduced.call(this,chldload,cb,progresscb);
  };
  Svg.prototype.produceAndAddFrom = mylib.SvgParent.prototype.produceAndAddFrom;
  Svg.prototype.registerObject = commonlib.SvgBase.prototype.registerObject;
  Svg.prototype.checkElementById = commonlib.SvgBase.prototype.checkElementById;
  Svg.prototype.childById = mylib.SvgParent.prototype.childById;
  Svg.prototype.onResolveNeeded = commonlib.SvgBase.prototype.onResolveNeeded;
  Svg.prototype.tagName = function(){
    return 'svg';
  };
  Svg.prototype.__cleanUp = function(){
    if(this.statik){
      this.statik.destroy();
    }
    this.__elementsById = null;
    this.statik = null;
    this.id = null;
    mylib.Dimensionable.prototype.__cleanUp.call(this);
    hierarchylib.StaticParent.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  mylib.Svg = Svg;
}

module.exports = createSvg;
