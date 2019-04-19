(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lr = ALLEX.execSuite.libRegistry;
lr.register('vektr_storagelib',
  require('./index')(
    ALLEX,
    lr.get('vektr_utillib'),
    lr.get('vektr_mathlib'),
    lr.get('vektr_commonlib'),
    lr.get('allex_hierarchymixinslib')
  )
);

},{"./index":2}],2:[function(require,module,exports){
function createLib (execlib, utillib, mathlib, commonlib, hierarchylib) {
  'use strict'

  var lib = execlib.lib;
  var ret = {};

  require('./src/stylablecreator')(lib, utillib, ret);
  require('./src/gradientcreator')(lib, utillib, hierarchylib, ret);
  require('./src/lineargradientcreator')(lib, utillib, ret);
  require('./src/radialgradientcreator')(lib, utillib, ret);
  require('./src/dimensionablecreator')(utillib, ret);
  require('./src/svgparentcreator')(lib, utillib, commonlib, hierarchylib, ret);
  require('./src/defscreator')(lib, hierarchylib, ret);
  require('./src/shapecreator')(lib, utillib, hierarchylib, ret);
  require('./src/positionablecreator')(utillib, ret);
  require('./src/areablecreator')(ret);
  require('./src/usecreator')(lib, utillib, ret);
  require('./src/pathcreator')(lib, utillib, mathlib, ret);
  require('./src/groupcreator')(lib, ret);
  require('./src/clippathcreator')(lib, ret);
  require('./src/statikcreator')(lib, ret);
  require('./src/polylinecreator')(lib, utillib, ret);
  require('./src/linecreator')(lib, utillib, ret);
  require('./src/polygoncreator')(lib, ret);
  require('./src/circlecreator')(lib, utillib, ret);
  require('./src/rectcreator')(lib, utillib, ret);
  require('./src/textcreator')(lib, utillib, ret);
  require('./src/spritecreator')(lib, utillib, ret);
  require('./src/svgcreator')(lib, utillib, commonlib, hierarchylib, ret);

  return ret;
}

module.exports = createLib;

},{"./src/areablecreator":3,"./src/circlecreator":4,"./src/clippathcreator":5,"./src/defscreator":6,"./src/dimensionablecreator":7,"./src/gradientcreator":8,"./src/groupcreator":9,"./src/lineargradientcreator":10,"./src/linecreator":11,"./src/pathcreator":12,"./src/polygoncreator":13,"./src/polylinecreator":14,"./src/positionablecreator":15,"./src/radialgradientcreator":16,"./src/rectcreator":17,"./src/shapecreator":18,"./src/spritecreator":19,"./src/statikcreator":20,"./src/stylablecreator":21,"./src/svgcreator":22,"./src/svgparentcreator":23,"./src/textcreator":24,"./src/usecreator":25}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
function createCircle(lib,utillib,mylib){
  'use strict';
  function Circle(cb,svgel,parnt){
    mylib.Shape.call(this,svgel,parnt);
    this.center = [utillib.readSVGAnimatedLength(svgel.cx)||0, utillib.readSVGAnimatedLength(svgel.cy)||0];
    this.radius = utillib.readSVGAnimatedLength(svgel.r)||0;
    cb(this);
  }
  lib.inherit(Circle,mylib.Shape);
  Circle.prototype.__cleanUp = function(){
    this.center = null;
    this.radius = null;
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.Areable.prototype.__cleanUp.call(this);
  };
  Circle.prototype.tagName = function(){
    return 'circle';
  };
  mylib.Circle = Circle;
}

module.exports = createCircle;

},{}],5:[function(require,module,exports){
function createClipPath(lib,mylib){
  'use strict';
  function ClipPath(cb,svgel,parnt){
    mylib.Shape.call(this,svgel,parnt);
    mylib.SvgParent.call(this,cb,svgel);
  }
  lib.inherit(ClipPath,mylib.SvgParent);
  ClipPath.prototype.assignStyle = mylib.Stylable.prototype.assignStyle;
  ClipPath.prototype.set_fill = mylib.Stylable.prototype.set_fill;
  ClipPath.prototype.set_stroke = mylib.Stylable.prototype.set_stroke;
  ClipPath.prototype.__cleanUp = function(){
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.SvgParent.prototype.__cleanUp.call(this);
  };
  mylib.ClipPath = ClipPath;
}

module.exports = createClipPath;

},{}],6:[function(require,module,exports){
function createDefs(lib, hierarchylib, mylib){
  'use strict';
  function Defs(cb,svgel,parnt){
    this.id = svgel.id;
    hierarchylib.StaticChild.call(this,parnt);
    mylib.SvgParent.call(this,cb,svgel);
  }
  lib.inherit(Defs,mylib.SvgParent);
  Defs.prototype.tagName = function(){
    return 'defs';
  };
  Defs.prototype.__cleanUp = function(){
    this.id = null;
    mylib.SvgParent.prototype.__cleanUp.call(this);
    hierarchylib.StaticChild.prototype.__cleanUp.call(this);
  };
  mylib.Defs = Defs;
}

module.exports = createDefs;

},{}],7:[function(require,module,exports){
function createDimensionable(utillib,mylib){
  'use strict';
  function Dimensionable(svgel){
    this.dimensions = [utillib.readSVGAnimatedLength(svgel.width)||0,utillib.readSVGAnimatedLength(svgel.height)||0];
  }
  Dimensionable.prototype.__cleanUp = function(){
    this.dimensions = null;
  };
  mylib.Dimensionable = Dimensionable;
}

module.exports = createDimensionable;

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
function createGroup(lib,mylib){
  'use strict';
  function Group(cb,svgel,parnt){
    this.__parent = parnt;
    mylib.SvgParent.call(this,cb,svgel);
    mylib.Shape.call(this,svgel,parnt);
  }
  lib.inherit(Group,mylib.SvgParent);
  Group.prototype.assignStyle = mylib.Stylable.prototype.assignStyle;
  Group.prototype.set_fill = mylib.Stylable.prototype.set_fill;
  Group.prototype.set_stroke = mylib.Stylable.prototype.set_stroke;
  Group.prototype.tagName = function(){
    return 'g';
  };
  Group.prototype.__cleanUp = function(){
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.SvgParent.prototype.__cleanUp.call(this);
  };
  mylib.Group = Group;
}

module.exports = createGroup;

},{}],10:[function(require,module,exports){
function createLinearGradient(lib,utillib,mylib){
  'use strict';
  function LinearGradient(cb,svgel,parnt){
    mylib.Gradient.call(this,svgel,parnt);
    this.vector = [
      utillib.readSVGAnimatedLength(svgel.x1)||0,
      utillib.readSVGAnimatedLength(svgel.y1)||0,
      utillib.readSVGAnimatedLength(svgel.x2)||0,//'100%',
      utillib.readSVGAnimatedLength(svgel.y2)||0
    ];
    cb(this);
  }
  lib.inherit(LinearGradient,mylib.Gradient);
  LinearGradient.prototype.tagName = function(){
    return 'linearGradient';
  };
  mylib.LinearGradient = LinearGradient;
}

module.exports = createLinearGradient;

},{}],11:[function(require,module,exports){
function createLine (HERS, utillib, mylib) {
  'use strict';
  function Line(cb,svgel,parnt){
    mylib.PolyLine.call(this,cb,svgel,parnt);
  }
  HERS.inherit(Line,mylib.PolyLine);
  Line.prototype.readPoints = function(svgel){
    this.onPoint({
      x: utillib.readSVGAnimatedLength(svgel.x1)||0, 
      y: utillib.readSVGAnimatedLength(svgel.y1)||0
    });
    this.onPoint({
      x: utillib.readSVGAnimatedLength(svgel.x2)||0, 
      y: utillib.readSVGAnimatedLength(svgel.y2)||0
    });
  };
  Line.prototype.tagName = function(){
    return 'line';
  };
  mylib.Line = Line;
}

module.exports = createLine;


},{}],12:[function(require,module,exports){
function createPath(lib,utillib,mathlib,mylib){
  'use strict';

  function PathTraverser () {
    this.initial_point = null;
    this.point = null;
    this.boundingBox = null;
    this.actions = null;
    this.actions_counter = null;
  }

  PathTraverser.prototype.destroy = function () {
    this.initial_point = null;
    this.point = null;
    this.boundingBox = null;
    this.actions = null;
    this.actions_counter = null;
  };

  PathTraverser.prototype.reset = function (list) {
    this.initial_point = null;
    this.point = [0,0];
    this.boundingBox = [Infinity, -Infinity, Infinity, -Infinity];
    this.actions = new Array(list.numberOfItems);
    this.actions_counter = 0;
    utillib.traverseSvgCollection(list,this.addCurveAction.bind(this));
  };

  PathTraverser.prototype.addCurveAction = function (svgel,svgelindex){
    var f = this.pathSegmentFunctional(svgel, svgelindex);
    if (this.actions_counter === 1) {
      this.initial_point = this.point.slice();
    }
    if(f){
      this.actions[svgelindex] = f;
    }
    if(f===null){
      throw(svgel.pathSegType+' not supported');
    }
  };

  PathTraverser.prototype.pathSegmentFunctional = function(svgel, svgelindex){
    var x,y,bcd, point = this.point, bbox = this.boundingBox;
    this.actions_counter++;
    switch(svgel.pathSegType){
      case 1:
        this.actions_counter = 0;
        this.point = this.initial_point.slice();
        return closePath;
        //PATHSEG_CLOSEPATH 
      case 2:
        absAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return moveTo.bind(null,point[0],point[1]);
        //PATHSEG_MOVETO_ABS 
      case 3:
        relAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return moveTo.bind(null,point[0],point[1]);
        //PATHSEG_MOVETO_REL 
      case 4:
        absAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return lineTo.bind(null,point[0],point[1]);
        //PATHSEG_LINETO_ABS 
      case 5:
        relAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return lineTo.bind(null,point[0],point[1]);
        //PATHSEG_LINETO_REL 
      case 6:
        x = point[0]; y = point[1];
        absAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return bezierCurveTo.bind(null,svgel.x1,svgel.y1,svgel.x2,svgel.y2,point[0],point[1]);
        //PATHSEG_CURVETO_CUBIC_ABS 
      case 7:
        x=point[0]; y=point[1];
        relAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        var bbb = mathlib.bezierBBox(x,y,x+svgel.x1,y+svgel.y1,x+svgel.x2,y+svgel.y2,point[0],point[1]);
        mathlib.updateBBox(bbox,bbb.min);
        mathlib.updateBBox(bbox,bbb.max);
        return bezierCurveTo.bind(null,x+svgel.x1,y+svgel.y1,x+svgel.x2,y+svgel.y2,point[0],point[1]);
        //PATHSEG_CURVETO_CUBIC_REL 
      case 8:
        absAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return quadraticCurveTo.bind(null,svgel.x1,svgel.y1,point[0],point[1]);
        //PATHSEG_CURVETO_QUADRATIC_ABS 
      case 9:
        x=point[0]; y=point[1];
        relAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return quadraticCurveTo.bind(null,x+svgel.x,y+svgel.y,point[0],point[1]);
        //PATHSEG_CURVETO_QUADRATIC_REL 
      case 10:
        x = point[0]; y = point[1];
        absAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return arcTo.bind(null,mathlib.arcToSegments(bbox,point[0],point[1],svgel.r1,svgel.r2,svgel.largeArcFlag,svgel.angle,svgel.sweepFlag,x,y));
        //PATHSEG_ARC_ABS 
      case 11:
        x = point[0]; y = point[1];
        relAction(svgel.x,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return arcTo.bind(null,mathlib.arcToSegments(bbox,point[0],point[1],svgel.r1,svgel.r2,svgel.largeArcFlag,svgel.angle,svgel.sweepFlag,x,y));
        //PATHSEG_ARC_REL 
      case 12:
        absAction(svgel.x,point[1],point);
        mathlib.updateBBox(bbox,point);
        return lineTo.bind(null,point[0],point[1]);
        //PATHSEG_LINETO_HORIZONTAL_ABS 
      case 13:
        relAction(svgel.x,0,point);
        mathlib.updateBBox(bbox,point);
        return lineTo.bind(null,point[0],point[1]);
        //PATHSEG_LINETO_HORIZONTAL_REL 
      case 14:
        absAction(point[0],svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return lineTo.bind(null,point[0],point[1]);
        //PATHSEG_LINETO_VERTICAL_ABS 
      case 15:
        relAction(0,svgel.y,point);
        mathlib.updateBBox(bbox,point);
        return lineTo.bind(null,point[0],point[1]);
        //PATHSEG_LINETO_VERTICAL_REL 
      case 16:
        return null; //not supported yet
        //PATHSEG_CURVETO_CUBIC_SMOOTH_ABS 
      case 17:
        return null; //not supported yet
        //PATHSEG_CURVETO_CUBIC_SMOOTH_REL 
      case 18:
        return null; //not supported yet
        //PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS 
      case 19:
        return null; //not supported yet
        //PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL 
    }
  };


  function absAction(myx,myy,point){
    point[0] = myx;
    point[1] = myy;
  }
  function relAction(myx,myy,point){
    point[0] += myx;
    point[1] += myy;
  }
  function closePath(ctx){
    ctx.closePath();
  }
  function moveTo(x,y,ctx){
    ctx.moveTo(x,y);
  }
  function lineTo(x,y,ctx){
    ctx.lineTo(x,y);
  }
  function bezierCurveTo(cx1,cy1,cx2,cy2,x,y,ctx){
    ctx.bezierCurveTo(cx1,cy1,cx2,cy2,x,y);
  }
  function quadraticCurveTo(cx,cy,x,y,ctx){
    ctx.quadraticCurveTo(cx,cy,x,y);
  }
  function arcTo(segs,ctx){
    for(var i in segs){
      ctx.bezierCurveTo.apply(ctx,segs[i]);
    }
  }

  function Path(cb,svgel,parnt){
    mylib.Shape.call(this,svgel,parnt);
    this.svgpathel = svgel;
    var traverser = Path.traverser;
    traverser.reset(svgel.pathSegList);
    var bb = traverser.boundingBox;
    this.__curveactions = traverser.actions;
    this.boundingBox = [bb[0],bb[2],bb[1]-bb[0],bb[3]-bb[2]];
    traverser.destroy();
    traverser = null;
    cb(this);
  }
  lib.inherit(Path,mylib.Shape);
  Path.prototype.tagName = function(){
    return 'path';
  };
  Path.prototype.__cleanUp = function(){
    this.__curveactions = null;
    this.svgpathel = null;
    mylib.Shape.prototype.__cleanUp.call(this);
  };
  Path.traverser = new PathTraverser();
  mylib.Path = Path;
}

module.exports = createPath;

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
function createPositionable(utillib,mylib){
  'use strict';
  function Positionable(svgel){
    this.pos = [utillib.readSVGAnimatedLength(svgel.x)||0, utillib.readSVGAnimatedLength(svgel.y)||0];
  }
  Positionable.prototype.__cleanUp = function(){
    this.pos = null;
  };
  mylib.Positionable = Positionable;
}

module.exports = createPositionable;

},{}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
function createRect(lib,utillib,mylib){
  'use strict';
  function Rect(cb,svgel,parnt){
    mylib.Areable.call(this,svgel);
    mylib.Shape.call(this,svgel,parnt);
    this.rounding = [utillib.readSVGAnimatedLength(svgel.rx), utillib.readSVGAnimatedLength(svgel.ry)];
    if(!this.rounding[1] && this.rounding[0]){
      this.rounding[1] = this.rounding[0];
    }
    if(!this.rounding[0] && this.rounding[1]){
      this.rounding[0] = this.rounding[1];
    }
    cb(this);
  }
  lib.inherit(Rect,mylib.Shape);
  Rect.prototype.__cleanUp = function(){
    this.rounding = null;
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.Areable.prototype.__cleanUp.call(this);
  };
  Rect.prototype.tagName = function(){
    return 'rect';
  };
  mylib.Rect = Rect;
}

module.exports = createRect;

},{}],18:[function(require,module,exports){
function createShape(lib,utillib,hierarchylib,mylib){
  'use strict';
  function Shape(svgelement,parnt){
    hierarchylib.StaticChild.call(this,parnt);
    this.id = svgelement.id;
    mylib.Stylable.call(this,svgelement);
    this.clipPath = null;
    this.transformMatrix = utillib.readTransform(svgelement.transform);
  }
  lib.inherit(Shape,mylib.Stylable);
  Shape.prototype.__cleanUp = function(){
    this.transformMatrix = null;
    if(this.clipPath){
      this.clipPath.destroy();
    }
    this.clipPath = null;
    mylib.Stylable.prototype.__cleanUp.call(this);
    this.id = null;
    hierarchylib.StaticChild.prototype.__cleanUp.call(this);
  };
  mylib.Shape = Shape;
}

module.exports = createShape;


},{}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
function createStatik(lib,mylib){
  'use strict';
  function Statik(cb,svgel,parnt){
    mylib.Group.call(this,cb,svgel,parnt);
  }
  lib.inherit(Statik,mylib.Group);
  mylib.Statik = Statik;
}

module.exports = createStatik;

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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


},{}],24:[function(require,module,exports){
function createText(lib,utillib,mylib){
  'use strict';
  function Text(cb,svgel,parnt){
    mylib.Positionable.call(this,svgel);
    mylib.Shape.call(this,svgel,parnt);
    var dx = utillib.readSVGAnimatedLength(svgel.dx), dy = utillib.readSVGAnimatedLength(svgel.dy);
    this.displacement = (dx===null && dy === null) ? null : [dx,dy];
    this.assignStyle('fontSize',svgel.style.getPropertyValue('font-size'));
    this.assignStyle('fontStyle',svgel.style.getPropertyValue('font-style'));
    this.assignStyle('fontWeight',svgel.style.getPropertyValue('font-weight'));
    this.assignStyle('fontFamily',svgel.style.getPropertyValue('font-family'));
    this.assignStyle('fontVariant',svgel.style.getPropertyValue('font-variant'));
    this.assignStyle('lineHeight',svgel.style.getPropertyValue('line-height'));
    this.assignStyle('letterSpacing',svgel.style.getPropertyValue('letter-spacing'));
    this.assignStyle('textAlign',svgel.style.getPropertyValue('text-align'));
    this.assignStyle('textAnchor',svgel.style.getPropertyValue('text-anchor'));
    this.text = svgel.textContent;
    cb(this);
  }
  lib.inherit(Text,mylib.Shape);
  Text.prototype.__cleanUp = function(){
    this.displacement = null;
    mylib.Shape.prototype.__cleanUp.call(this);
    mylib.Positionable.prototype.__cleanUp.call(this);
  };
  Text.prototype.tagName = function(){
    return 'text';
  };
  mylib.Text = Text;
}

module.exports = createText;

},{}],25:[function(require,module,exports){
function createUse(lib,utillib,mylib){
  'use strict';
  function Use(cb,svgel,parnt){
    mylib.Shape.call(this,svgel,parnt);
    mylib.Areable.call(this,svgel);
    this.usedObj = null;
    if(parnt && parnt.onResolveNeeded){
      parnt.onResolveNeeded(this,'usedObj',utillib.readSVGUseLink(svgel.href));
    }
    cb(this);
  }
  Use.prototype.assignStyle = mylib.Stylable.prototype.assignStyle;
  Use.prototype.set_fill = mylib.Stylable.prototype.set_fill;
  Use.prototype.set_stroke = mylib.Stylable.prototype.set_stroke;
  Use.prototype.tagName = function(){
    return 'use';
  };
  Use.prototype.__cleanUp = function(){
    this.usedObj = null;
    mylib.Areable.prototype.__cleanUp.call(this);
    mylib.Shape.prototype.__cleanUp.call(this);
  };
  mylib.Use = Use;
}

module.exports = createUse;

},{}]},{},[1]);
