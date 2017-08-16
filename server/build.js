import ora from 'ora';
import logSymbols from 'log-symbols';
import webpack from './webpack';
import loadCorenConfig from './load-coren-config';
import {addClientEntry, createClientTmpEntryFile} from './client-entry';

const runWebpack = (compiler, msg) => {
  return () => {
    const spinner = ora(msg).start();
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(err);
        }

        const jsonStats = stats.toJson();

        if (jsonStats.errors.length > 0) {
          const error = new Error(jsonStats.errors[0]);
          error.errors = jsonStats.errors;
          error.warnings = jsonStats.warnings;
          return reject(error);
        }
        spinner.stopAndPersist({
          symbol: logSymbols.success,
          text: msg
        });
        resolve(jsonStats);
      });
    });
  };
};

export default function build({dir, skipClientJS, env}) {
  const config = loadCorenConfig(dir);
  const updatedCorenConfig = addClientEntry(dir, config);
  const {clientCompiler, serverCompiler} = webpack({dir, corenConfig: updatedCorenConfig, dev: env !== 'production'});
  const runServerWebpack = runWebpack(serverCompiler, 'Building server side webpack');
  const runClientWebpack = runWebpack(clientCompiler, 'Building client side webpack');

  return runServerWebpack()
          .then(() => {
            if (!skipClientJS) {
              createClientTmpEntryFile(dir, updatedCorenConfig);
              return runClientWebpack();
            }
          })
          .catch(err => {
            console.log(err);
          });
}
