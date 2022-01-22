import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import packageJson from './package.json';

export default [
	{
		input: 'src/index.ts',
		output: [
			{ file: packageJson.main, format: 'cjs', sourcemap: true,},
			{ file: packageJson.module, format: 'esm', sourcemap: true,},
		],
		plugins: [
			svgr(),
			url(),
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript(),
			postcss({modules: true}),
			copy({
				targets: [
					{ src: './public', dest: 'build' },
					{ src: './src/style', dest: 'build' },
					{ src: './src/index.scss', dest: 'build' },
				],
			}),
		],
	},
	{ input: 'src/index.d.ts', output: [{ file: 'build/index.d.ts', format: 'esm' }], external: [/\.css$/], plugins: [dts()],},
];
