const path = require('path')
const {markdownCodeLanguages} = require('../config')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      ident: 'postcss',
      plugins: [
        require('autoprefixer')(),
        require('cssnano')({
          preset: 'default',
        }),
      ],
    },
  },
}

const babelConfig = {
  presets: [
    ['@babel/env', {
      loose: true,
      modules: false,
      targets: '> 1%, last 2 versions',
      corejs: 3,
      useBuiltIns: 'entry',
    }],
    '@babel/react',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/proposal-class-properties',
  ],
}

module.exports = (env, argv) => {
  const {mode} = argv
  const isDev = mode !== 'production'
  return {
    mode,
    context: path.resolve(__dirname),
    entry: './main.js',
    output: {
      path: path.resolve(__dirname, '../backend/static'),
      filename: 'main.js',
    },
    devServer: isDev ? {
      contentBase: '../backend/static',
      port: 3000,
      proxy: {
        '/api': 'http://localhost:4000',
        '/files': 'http://localhost:4000',
      },
      historyApiFallback: true,
    } : {},
    // devtool: 'eval-cheap-module-source-map',
    devtool: isDev && 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.t|jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig,
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            postcssLoader,
          ],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            'style-loader',
            'css-loader',
            // 'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|bmp|png|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        },
        {
          test: /\.(ttf|svg)$/,
          loader: 'file-loader',
        },
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        favicon: './assets/images/identicon.png',
      }),
      // IDEA: 筛选 hljs 的语言, 按需加载
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(${markdownCodeLanguages.join('|')})$`),
      ),
      !isDev && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      !isDev && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      })
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '~': path.resolve(__dirname, ''),
        '~style': path.resolve(__dirname, 'assets/style'),
        '~images': path.resolve(__dirname, 'assets/images'),
        '~api': path.resolve(__dirname, '../backend/api'),
        '~config': path.resolve(__dirname, '../config'),
        '~utils': path.resolve(__dirname, 'utils'),
      }
    },
  }
}
