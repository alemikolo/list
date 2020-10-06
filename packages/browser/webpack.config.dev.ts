import autoprefixer from 'autoprefixer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface IConfiguration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: IConfiguration = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../../dist/public'),
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'tests', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        }
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentWidth: 2,
                includePaths: ['./src/app/scss']
              },
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 4000,
    open: true,
    inline: true,
    hot: true,
    disableHostCheck: true,
    proxy: {
      '/api': 'http://localhost:5000',
      '/graphql': 'http://localhost:5000/graphql'
    },
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: true
  },
  plugins: [
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin({ verbose: true }),
    new HtmlWebPackPlugin({ template: path.resolve('public/index.html') })
  ]
};

export default config;
