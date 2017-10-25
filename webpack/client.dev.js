const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  // devtool: 'source-map',
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js')
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../buildClient'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.global\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      },
      {
        test: /^(?!.*?\.global).*\.(css|scss)$/,
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                camelCase: 'dashes',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                data: "@import 'resources';",
                includePaths: [path.join(__dirname, '../src/sass/resources/')]
              }
            }
          ]
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components/'),
      containers: path.resolve(__dirname, '../src/containers/'),
      images: path.resolve(__dirname, '../src/img/')
    },
    modules: [path.resolve('./src/'), 'node_modules'],
    extensions: ['.js', '.css', '.scss']
  },
  plugins: [
    new WriteFilePlugin(), // used so you can see what chunks are produced in dev
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: '[name].js',
      minChunks: Infinity
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'history/createBrowserHistory',
          'transition-group',
          'redux-first-router',
          'redux-first-router-link',
          'babel-polyfill',
          'redux-devtools-extension/logOnlyInProduction'
        ]
      }
    })
  ]
};
