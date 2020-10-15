import path from 'path';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
const options = {
    input: 'src/main.ts',
    output: [{
        file: path.resolve(__dirname, 'dist','index.js'),
        format: 'umd',
        name:'K'
    }, {
        file:  path.resolve(__dirname, 'dist','index.min.js'),
        format: 'umd',
        name:'K',
        plugins: [terser()]
    },
    {
        file: path.resolve(__dirname, 'dist','index.mjs'),
        format: 'esm',
    },
    {
        file: path.resolve(__dirname, 'dist','index.cjs'),
        format: 'cjs',
       
    }],
    plugins: [resolve(),json(),commonjs(),typescript() ]
};
export default options