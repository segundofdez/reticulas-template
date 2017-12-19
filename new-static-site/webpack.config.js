var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
/*
var lessLoader = ExtractTextPlugin.extract(
  "css?sourceMap!less?sourceMap"
);
*/
var inProduction = (process.env.NODE_ENV === 'production');


module.exports = {
    entry: {
        app: [
            './src/js/main.js',
            './src/styles/main.less'
        ]
    },
    output: {
       path: path.resolve(__dirname, './dist'),
       filename: './js/main.js'
    },
    //devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader']
                    /*
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                //url: false,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                    */

                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/main.css'
        }),
        new webpack.LoaderOptionsPlugin ({
            minimize: inProduction
        })
    ]
};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}
