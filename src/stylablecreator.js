function createStylable(lib,utillib,mylib){
  'use strict';
  function alphaValue(style){
    var val = style.getPropertyValue('opacity');
    val = parseFloat(val);
    if(isNaN(val)){
      return null;
    }
    return val;
  }
  function pxStyleValue(style,attrname){
    var val = style.getPropertyValue(attrname);
    if(!val){return val;}
    var pxi = val.indexOf('px');
    if(pxi>=0){
      val = parseFloat(val.substring(0,pxi));
    }
    return val;
  }
  function Stylable(svgelement){
    this.style = {};
    this.assignStyle('opacity', alphaValue(svgelement.style));
    this.assignStyle('display', svgelement.style.display);
    this.style.display = this.style.display !== 'none';
    this.assignStyle('strokeWidth', pxStyleValue(svgelement.style,'stroke-width'));
    this.assignStyle('strokeMiterlimit', pxStyleValue(svgelement.style,'stroke-miterlimit'));
    this.assignStyle('strokeLinecap', svgelement.style.getPropertyValue('stroke-linecap'));
    utillib.resolveStyle.call(this,svgelement.style,'fill');
    utillib.resolveStyle.call(this,svgelement.style,'stroke');
  }
  Stylable.prototype.assignStyle = function(name,val){
    if(val!==null){
      this.style[name] = val;
    }
  };
  Stylable.prototype.set_fill = function(val){
    if(val!==null && 'undefined' !== typeof val){
      this.style.fill = val;
    }
  };
  Stylable.prototype.set_stroke = function(val){
    if(val!==null && 'undefined' !== typeof val){
      this.style.stroke = val;
    }
  };
  function possiblyDestroyAndDelete(hash,val,name){
    if('function' === typeof val.destroy){
      val.destroy();
    }
    delete hash[name];
  }
  Stylable.prototype.__cleanUp = function(){
    lib.traverse(this.style,possiblyDestroyAndDelete.bind(null,this.style));
  };
  mylib.Stylable = Stylable;
}

module.exports = createStylable;
