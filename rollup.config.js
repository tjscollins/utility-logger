// rollup.config.js
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  // core input options
  input: 'src/index.js', // required
  // external,
  plugins: [
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
    // globals,

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
