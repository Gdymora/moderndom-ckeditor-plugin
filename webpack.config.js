const path = require('path');

module.exports = {
  entry: {
    'moderndom-ckeditor-plugin': './src/plugins/ckeditor.js',
    'moderndom-formvalidation-plugin': './src/plugins/formValidation.js',
    'moderndom-autocomplete-plugin': './src/plugins/autocomplete.js',
    'moderndom-all-plugins': './src/index.js'  // Додайте цей рядок
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: ['ModernDOM', '[name]'],
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    moderndom: 'ModernDOM'
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