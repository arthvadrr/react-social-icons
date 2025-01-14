import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

// Define multiple input files
const paths = [
	{
		scripts: './static-pages/svg-examples/scripts/index.ts',
		styles: './static-pages/svg-examples/styles/index.scss',
		output: './static-pages/svg-examples/dist/',
	},
];

export default paths.flatMap(({ scripts, styles, output }) => [
	// JavaScript/TypeScript entry
	{
		input: scripts,
		output: {
			file: `${output}.bundle.js`,
			format: 'iife',
			sourcemap: true,
		},
		plugins: [
			resolve(),
			commonjs(),
			typescript({
				tsconfig: false,
				target: 'ESNext',
				module: 'ESNext',
				strict: true,
				skipLibCheck: true,
				esModuleInterop: true,
				moduleResolution: 'Node',
			}),
			terser(),
		],
	},
	// SCSS entry
	{
		input: styles,
		output: {
			file: `${output}/main.min.css`, // Output CSS file
		},
		plugins: [
			postcss({
				extract: `${output}.bundle.css`, // Specify the CSS output path
				minimize: true,
				sourceMap: true,
				extensions: ['.scss'],
				use: ['sass'], // Process SCSS
			}),
		],
	},
]);