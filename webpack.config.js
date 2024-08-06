const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'moderndom-ckeditor-plugin.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ModernDOMCKEditor',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    moderndom: 'ModernDOM',
    '@ckeditor/ckeditor5-build-classic': 'ClassicEditor'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'production'
};