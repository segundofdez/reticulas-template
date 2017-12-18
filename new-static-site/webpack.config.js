var webpack = require('webpack');
var path = require('path');
var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: './src/js/main.js',
    output: {
       path: path.resolve(__dirname, './dist/js'),
       filename: 'main.js'
    },
    plugins: []
};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}