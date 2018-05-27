const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}]
      }
    ]
  }
}
