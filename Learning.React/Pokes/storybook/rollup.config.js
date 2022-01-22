import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs';
import packageJson from './package.json';

export default [
  {
    input : './src/index.js',
    output : [
		  { file: packageJson.main, format: 'cjs', sourcemap: true },
		  { file: packageJson.module, format: 'esm', sourcemap: true }
	  ],
	  plugins: [
			postcss({ plugins : [], minimize : true }),
		  babel({ exclude : 'node_modules/**', presets : ['@babel/preset-react'] }),
		  external(),
		  resolve({ extensions : ['.js', '.jsx', '.ts', '.tsx'] }),
		  commonjs(),
		  terser()
	  ]
  }
]
