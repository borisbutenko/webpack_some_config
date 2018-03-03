'use strict';

// --- dependencies
const [ path, webpack ] = [ require('path'), require('webpack') ];

// --- plugins
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// --- environment
const isProduction = (process.env.NODE_ENV === 'production');

// --- dev folder
const devFolder = path.resolve(__dirname, './src');

// --- globals
const [ css, scss ] = [ 'css-loader?{discardComments:{removeAll:true}}', `sass-loader` ];

// --- plugins
const plugins = [
  new ExtractTextPlugin({
    filename: `./bundle.css`,
    allChunks: true
  })
];

if (isProduction) {
  plugins = [
    ...plugins,
    ...[
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
      new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: false,
        mangle: true,
        compress: { warnings: false },
        output: {
          space_colon: false,
          comments: false
        }
      }),
      new webpack.LoaderOptionsPlugin({ minimize: true })
    ]
  ]
}

module.exports = {
  name: 'webpack-config',

  entry: ['babel-polyfill', path.resolve(__dirname, `${devFolder}/main.js`)],

  output: {
    path: path.resolve(__dirname, `./dist`),
    publicPath: `./dist`,
    filename: `bundle.js`,
    chunkFilename: '[name].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          css
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'vue-style-loader',
          css,
          scss
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          autoprefixer: false,
          extractCSS: true,

          cssModules: {
            minimize: true,
            localIdentName: '[hash:base64:5]'
          },

          loaders: {
            css: ExtractTextPlugin.extract({
              use: `${css}`,
              fallback: 'vue-style-loader'
            }),

            sass: ExtractTextPlugin.extract({
              use: `${css}!${scss}`,
              fallback: 'vue-style-loader'
            }),

            scss: ExtractTextPlugin.extract({
              use: `${css}!${scss}`,
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [
      '*',
      '.css',
      '.scss',
      '.sass',
      '.js',
      '.vue',
      '.json'
    ],

    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },

  performance: { hints: false },

  devtool: (isProduction) ? false : 'cheap-module-inline-source-map',

  plugins
};