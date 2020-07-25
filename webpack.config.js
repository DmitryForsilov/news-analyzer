const path = require('path');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    index: './src/pages/index/index.js',
    about: './src/pages/about/about.js',
    analytics: './src/pages/analytics/analytics.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundles/[name]/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopmentEnvironment
          ? {
            loader: 'style-loader',
            }
          : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../',
              },
            },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './images/[name].[ext]',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff2?)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: './vendor/fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundles/[name]/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['index'],
      template: './src/pages/index/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['about'],
      template: './src/pages/about/about.html',
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['analytics'],
      template: './src/pages/analytics/analytics.html',
      filename: 'analytics.html',
    }),
    new WebpackMd5Hash(),
  ],
};