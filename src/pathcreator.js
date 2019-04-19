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
