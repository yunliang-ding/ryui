const path = require('path')
const config = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'lib/'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  },
  module: {
    rules: [{
      test: /\.(png|jpg|gif|svg|ttf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      }
    },{
      test: /\.css$/,
      use: [
        { loader: 'css-loader' }
      ]
    },
    {
      test: /\.less/,
      include: [
        path.resolve(__dirname, './src')
      ],
      use: [
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader',
          options: { javascriptEnabled: true }
        }
      ]
    },
    {
      test: /\.(tsx|ts)?$/,
      exclude: [/node_modules/, /public/],
      use: ['ts-loader']
    }]
  },
  mode: 'production'
}
module.exports = config