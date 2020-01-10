import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
  {
    input: './src/index.js',

    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [resolve(), babel(), terser()]
  },
  {
    input: {
      cancelableDelayPromise: 'src/cancelableDelayPromise.js',
      cancelablePromise: 'src/cancelablePromise.js',
      CancelableRequest: 'src/CancelableRequest.js',
      delayPromise: 'src/delayPromise.js',
      sequentPromisesList: 'src/sequentPromisesList.js',
      SetTimeoutRequest: 'src/SetTimeoutRequest.js'
    },
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs'
      },
      {
        dir: 'dist/es',
        format: 'es'
      }
    ],
    plugins: [resolve(), babel(), terser()]
  }
];
