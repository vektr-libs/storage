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
