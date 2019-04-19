function createSprite(lib,utillib,mylib){
  'use strict';
  window.__vektrImageDictionary = new ImageBank();
  function ImageBank(){
    this.images = new lib.Map();
  }
  ImageBank.prototype.getImage = function(src,cb){
    var i = this.images.get(src);
    if(i){
      if(i instanceof PendingImage){
        i.addWaiter(cb);
        return;
      }
      cb(i);
    }else{
      i = new PendingImage(this,src,cb);
      this.images.add(src, i);
    }
  };

  ImageBank.prototype.release = function () {
    this.images.traverse(this._releaseImage.bind(this));
    this.images.purge();
  };

  ImageBank.prototype._releaseImage = function (img){
    if (img instanceof PendingImage) {
      img.destroy();
      return;
    }
  };


  var _imageBankInstance = (function(i){
    return function(){
      return i;
    };
  })(window.__vektrImageDictionary);
  function PendingImage(imagebank,src,cb){
    this.src = src;
    this.imagebank = imagebank;
    this.image = new Image();
    this.waiters = [cb];
    this.image.onload = this.imageLoaded.bind(this);
    this.image.onerror = this.imageFailed.bind(this);
    this.image.src = this.src;
  }

  PendingImage.prototype._clearwaiters = function (img) {
    var w;
    if (!this.waiters) {
      return;
    }
    while(this.waiters.length){
      w = this.waiters.shift();
      w(img);
    }
  };

  PendingImage.prototype.imageLoaded = function (){
    if (!this.imagebank) {
      return;
    }
    if (this.imagebank.images) this.imagebank.images.replace(this.src,this.image);
    this._clearwaiters(this.image);
  };

  PendingImage.prototype.imageFailed = function () {
    if (this.imagebank.images) this.imagebank.images.remove(this.src);
    this._clearwaiters(null);
  };


  PendingImage.prototype.addWaiter = function(cb){
    this.waiters.push(cb);
  };
  PendingImage.prototype.destroy = function(){
    this.waiters = null;
    this.image = null;
    this.imagebank = null;
    this.src = null;
  };
  function setImage(img){
    this.image = img;
    this.changed.fire();
  }
  function Sprite(cb,svgel,parnt){
    lib.Changeable.call(this);
    mylib.Shape.call(this,svgel,parnt);
    mylib.Areable.call(this,svgel);
    this.image = null;
    _imageBankInstance().getImage(utillib.readSVGAnimatedString(svgel.href),setImage.bind(this));
    cb(this);
  }
  lib.inherit(Sprite,mylib.Shape);
  Sprite.prototype.attachListener = lib.Listenable.prototype.attachListener;
  Sprite.prototype.tagName = function(){
    return 'image';
  };
  Sprite.prototype.__cleanUp = function(){
    this.image = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylib.Shape.prototype.__cleanUp.call(this);
    lib.Changeable.prototype.__cleanUp.call(this);
  };
  Sprite.loadRemote = function(imgpath){
    var d = lib.q.defer();
    _imageBankInstance().getImage(imgpath,decidedefer.bind(null, d));
    return d.promise;
  };

  function decidedefer (d, img) {
    if (img) return d.resolve(img);
    d.reject('Load failed');
  }
  mylib.Sprite = Sprite;
}

module.exports = createSprite;
