import {join} from 'path';
import mkdirp from 'mkdirp';

exports.generateNeededDir = dir => {
  const dirs = [
    join(dir, '.coren', 'tmp'),
    join(dir, '.coren', 'commonjs'),
    join(dir, '.coren', 'html')
  ];
  dirs.forEach(d => mkdirp.sync(d));
};
// .coren
exports.corenDir = dir => {
  return join(dir, '.coren');
};

exports.clientTmpEntryDir = dir => {
  return join(dir, '.coren', 'tmp');
};

exports.assetsJSON = dir => {
  return join(dir, '.coren', 'assets.json');
};

exports.ssrDir = dir => {
  return join(dir, '.coren', 'html');
};

exports.outputCommonJSDir = dir => {
  return join(dir, '.coren', 'commonjs');
};

exports.getEnv = () => {
  if (process.env.COREN_ENV) {
    return process.env.COREN_ENV;
  }
  if (process.env.NODE_ENV === 'development') {
    return 'development';
  }
  return 'production';
};

exports.preserveEntry = ['$vendor'];
