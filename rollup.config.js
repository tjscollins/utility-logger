// rollup.config.js
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { minify } from 'uglify-es';

export default {
  // core input options
  input: 'src/index.js', // required
  // external: ['colors'],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      // browser: true,
    }),
    commonjs(),
    builtins(),
    globals(),
    babel(),
    uglify({}, minify),
  ],

  // advanced input options
  // onwarn,

  // danger zone
  // acorn,
  // context,
  // moduleContext,
  // legacy

  output: { // required (can be an array, for multiple outputs)
    // core output options
    file: 'dist/utility-logger.js', // required
    format: 'umd', // required
    name: 'UtilityLogger',
    globals: {
      // colors: 'colors',
    },

    // advanced output options
    // paths,
    // banner: '#!/usr/bin/env node',
    // footer,
    // intro,
    // outro,
    // sourcemap,
    // sourcemapFile,
    // interop,

    // danger zone
    // exports,
    // amd,
    // indent
    // strict
  },
};
