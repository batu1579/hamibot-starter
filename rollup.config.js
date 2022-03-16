import babel from 'rollup-plugin-babel';

import commonjs from 'rollup-plugin-commonjs'

export default {
    input: 'src/index.js',
    output: {
        format: 'umd',
        file: 'dist/index.js'
    },
    plugins: [
        commonjs(),
        babel({
            exclude: "node_modules/**"
        })
    ]
}
