const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'roar.min.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'roar',
    },
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
  };