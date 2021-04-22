const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './backend/static'),
  },
  // devServer: {
  //   contentBase: '.backend/static',
  //   port: 3000,
  //   proxy: {
  //     'api': 'http://localhost:4000',
  //   },
  //   historyApiFallback: true
  // },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
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
        test: [/\.(woff2?|ttf|svg|eot)$/],
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'frontend'),
      '~style': path.resolve(__dirname, 'frontend/assets/style'),
      '~images': path.resolve(__dirname, 'frontend/assets/images'),
      '~api': path.resolve(__dirname, 'backend/api'),
      '~config': path.resolve(__dirname, 'config'),
    }
  },
};

