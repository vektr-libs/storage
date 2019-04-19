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
