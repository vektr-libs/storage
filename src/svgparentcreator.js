function createSVGParent(lib,utillib,commonlib,hierarchylib,mylib){
  'use strict';
  function SvgParent(cb,svgel){
    hierarchylib.StaticParent.call(this);
    lib.runNext(this.createChildren.bind(this,svgel,cb));
  }
  lib.inherit(SvgParent,hierarchylib.StaticParent);

  SvgParent.prototype.destroy = function () {
    this.__cleanUp();
  };

  SvgParent.prototype.__cleanUp = function () {
    hierarchylib.StaticParent.prototype.__cleanUp.call(this);
  };

  SvgParent.prototype.createChildren = function(svgel,cb){
    var chldload = {target:svgel.childNodes.length,loaded:0};
    if(svgel.childNodes.length){
      utillib.traverseCollection(svgel.childNodes,this.produceAndAddFrom.bind(this,chldload,cb,null),'length','item');
    }else{
      this.onChildrenProduced(chldload,cb);
    }
  };
  SvgParent.prototype.addChild = function(chld){
    if(chld instanceof mylib.ClipPath && typeof this.clipPath !== 'undefined'){
      this.clipPath = chld;
      commonlib.set(chld,'__parent',this);
    }else{
      hierarchylib.StaticParent.prototype.addChild.call(this,chld);
    }
  };
  function findById(result,id,el){
    if(el.id===id){
      result.el = el;
      return true;
    }
  }
  SvgParent.prototype.childById = function(id){
    var res = {result:null};
    if(!this.__children.traverse(findById.bind(this,res,id))){
      return res.el;
    }
  };
  SvgParent.prototype.onChildrenProduced = function(chldload,cb){
    lib.runNext(cb.bind(null, this));
  };
  SvgParent.prototype.onChildProduced = function(chldload,cb,progresscb,chld){
    chldload.loaded++;
    if (progresscb) {
      progresscb(Math.round(chldload.loaded*100/chldload.target));
    }
    if(chldload.loaded === chldload.target){
      //console.log(this.id,'produced all',chldload.loaded,'children');
      this.onChildrenProduced(chldload,cb);
    }
  };
  SvgParent.prototype.produceAndAddFrom = function(chldload,cb,progresscb,el){
    var ctor = commonlib.svg.ctorFor(mylib,el);
    if(typeof ctor !== 'function'){
      this.onChildProduced(chldload,cb,progresscb);
      return;
    }
    var c = new ctor(this.onChildProduced.bind(this,chldload,cb,progresscb),el,this);
    return c;
  };
  SvgParent.prototype.onResolveNeeded = function(child,needtype,needname){
    if(this.__parent && this.__parent.onResolveNeeded){
      this.__parent.onResolveNeeded(child,needtype,needname);
    }
  };
  mylib.SvgParent = SvgParent;
}

module.exports = createSVGParent;

