let mix = require('laravel-mix');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const imageminMozjpeg = require('imagemin-mozjpeg');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const handlebars = require('handlebars');
const handlebarsLoader = require('handlebars-loader');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 */

mix.js('src/js/main.js', __dirname +'public/js')
    .less('src/styles/main.less', 'css')
    .options({
        postCss: [
            require('autoprefixer')({
                browsers: '>5%'
            }),
        ]
    })
    .combine(
        ['node_modules/normalize.css/normalize.css','public/css/main.css'],
        'public/css/main.css'
    )
;


mix.webpackConfig({
    /*
    output: {
        path: __dirname + '/public',
        filename: 'index_bundle.js'
    },
    */
    module: {
        loaders: [
            { test: /\.hbs$/, loader: "handlebars" }
        ]
    },
    output: {
        path: __dirname + '/public',
        filename: 'js/main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template using Handlebars',
            template: 'src/index.hbs',
        }),

        /*
        new HtmlWebpackPlugin(), // Generates default index.html
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'test.html',
            template: 'src/assets/test.html'
        }),
        */
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: ['public/*.html', 'public/css/*.css', 'public/js/*.js'],
            server: { baseDir: ['public'] }
        }),
        new CopyWebpackPlugin([{
            from: 'src/img',
            to: __dirname + '/public/img',
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '65-80'
            },
            plugins: [
                imageminMozjpeg({
                    quality: 65,
                })
            ]
        })
    ]
});