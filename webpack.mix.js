let mix = require('laravel-mix');
let ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 */

mix.js('src/js/main.js', 'public/js')
    .less('src/styles/main.less', 'public/css')
    .combine([
        'node_modules/normalize.css/normalize.css',
        'public/css/main.css'],
        'public/css/main.min.css')
    .browserSync('0.0.0.0:8181')
;

//Only in production, you can remove if you want to use "npm run watch"
if(mix.inProduction()) {
    mix.webpackConfig({
        plugins: [
            new CopyWebpackPlugin([{
                from: 'src/img',
                to: 'public/img/',
            }]),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                pngquant: {
                    quality: '65-80'
                },
                plugins: [
                    imageminMozjpeg({
                        quality: 65,
                        maxmemory: 1000 * 512
                    })
                ]
            })
        ],
    });
}
