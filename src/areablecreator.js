function createAreable(mylib){
  'use strict';
  function Areable(svgel){
    mylib.Positionable.call(this,svgel);
    mylib.Dimensionable.call(this,svgel);
  }
  Areable.prototype.__cleanUp = function(){
    mylib.Dimensionable.prototype.__cleanUp.call(this);
    mylib.Positionable.prototype.__cleanUp.call(this);
  };
  mylib.Areable = Areable;
}

module.exports = createAreable;
