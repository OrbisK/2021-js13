import {terser} from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import htmlTemplate from 'rollup-plugin-generate-html-template';
import clear from 'rollup-plugin-clear'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import kontra from 'rollup-plugin-kontra'
import ttypescript from 'ttypescript';
import typescript from 'rollup-plugin-typescript2';

// dev build if watching, prod build if not
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.ts',
    output: [
        {file: !production ? "dist/main.js" : "dist/main.min.js", format: 'iife'},
    ],
    plugins: [
        kontra({
            gameObject: {
                // enable only velocity and rotation functionality
                velocity: true,
                rotation: true
            },
            vector: {
                // enable vector length functionality
                length: true
            },
            // turn on debugging
            debug: true
        }),
        // To import libs from node_modules
        resolve(),
        commonjs(),

        // To include css from scripts, combine and minimize
        postcss({
            minimize: production,
            extract: !production ? path.resolve('dist/main.css') : path.resolve('dist/main.min.css'),
        }),
        production && terser({
            ecma: '2018',
            module: true,
            toplevel: true,
            compress: {
                keep_fargs: false,
                passes: 5,
                pure_funcs: ['assert', 'debug'],
                pure_getters: true,
                unsafe: true,
                unsafe_arrows: true,
                unsafe_comps: true,
                unsafe_math: true,
                unsafe_methods: true,
            },
            mangle: true
        }),
        // to use html template and include script and styles bundles
        htmlTemplate({
            template: 'src/index.html',
            target: production ? 'dist/index.dist.html' : 'dist/index.html',
        }),
        clear({
            // required, point out which directories should be clear.
            targets: ['dist'],
            // optional, whether clear the directories when rollup recompile on --watch mode.
            watch: true, // default: false
        }),
        !production && serve({
            open: true,
            verbose: true,
            contentBase: ['dist'],
            port: 8080
        }),
        !production && livereload(),
        typescript({
            typescript: ttypescript,
            useTsconfigDeclarationDir: true,
            emitDeclarationOnly: true,
        }),
    ]
};