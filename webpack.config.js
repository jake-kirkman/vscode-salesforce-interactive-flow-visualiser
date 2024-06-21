'use strict';
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');

const makeConfig = (argv, { entry, out, target, library = 'commonjs' }) => ({
    mode: argv.mode,
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry,
    target,
    output: {
        path: path.join(__dirname, path.dirname(out)),
        filename: path.basename(out),
        publicPath: '',
        library: {
            type: library
        },
        chunkFormat: library,
    },
    externals: {
        'vscode': 'commonjs vscode', // Tells Webpack to treat 'vscode' as an external module
        '@salesforce/core': 'commonjs @salesforce/core', // Tells Webpack to treat 'vscode' as an external module
        '@salesforce/apex-node': 'commonjs @salesforce/apex-node', // Tells Webpack to treat 'vscode' as an external module
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
        alias: {
          'react': 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat'
        }
    },
    module: {
        rules: [
            // Allow importing ts(x) files:
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: path.join(path.dirname(entry), 'tsconfig.json'),
                    // transpileOnly enables hot-module-replacement
                    transpileOnly: true,
                    compilerOptions: {
                        // Overwrite the noEmit from the client's tsconfig
                        noEmit: false,
                    },
                },
            },
            // Allow importing CSS modules:
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    'postcss-loader'
                ],
            },
            // Allow importing global CSS:
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: 'svg-url-loader',
                  options: {
                    limit: 10000,
                  },
                },
              ],
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            // Path from the output filename to the output directory
            __webpack_relative_entrypoint_to_root__: JSON.stringify(
                path.posix.relative(path.posix.dirname(`/index.js`), '/'),
            ),
            scriptUrl: 'import.meta.url',
        }),
    ],
    infrastructureLogging: {
        level: "log", // enables logging required for problem matchers
    },
});

module.exports = (env, argv) => [
    {
        ...makeConfig(argv, { entry: './src/ui/index.tsx', out: './out/ui/index.js', target: 'web', library: 'module' }),
        experiments: {
            outputModule: true,
        }
    },
    makeConfig(argv, { entry: './src/extension/extension.ts', out: './out/extension/extension.js', target: 'node' }),
];
