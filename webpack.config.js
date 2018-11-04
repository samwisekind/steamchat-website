const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const app = require('./package.json');

const production = process.env.NODE_ENV !== 'development';

const config = {
  entry: {
    'js/scripts': './src/assets/js/index.js',
    'css/styles': './src/assets/sass/index.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist', 'public'),
    filename: '[name].js',
  },
  mode: production ? 'production' : 'development',
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src', 'assets', 'img'),
      to: path.resolve(__dirname, 'dist', 'public', 'img'),
    }]),
    new WebpackNotifierPlugin({ title: app.name, alwaysNotify: true, contentImage: path.join(__dirname, '.appicon') }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } },
        ],
      },
      {
        test: /\.(s[a|c]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: { compress: true, mangle: production, warnings: true },
        sourceMap: true,
      }),
    ],
  },
};

if (!production) {
  config.devtool = 'source-map';
}

module.exports = config;
