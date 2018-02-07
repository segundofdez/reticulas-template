let mix = require('laravel-mix');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let ImageminPlugin = require( 'imagemin-webpack-plugin' ).default;
const imageminMozjpeg = require('imagemin-mozjpeg');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 */

mix.js('src/js/main.js', 'public/js')
    .less('src/styles/main.less', 'public/css')
    .options({
        postCss: [
            require('autoprefixer')({
                browsers: '>5%'
            }),
        ]
    })
    .combine([
        'node_modules/normalize.css/normalize.css',
        'public/css/main.css'],
        'public/css/main.min.css')
    .browserSync({
        proxy: '0.0.0.0:8181',
        files: ['public/*.html', 'public/css/*.css', 'public/js/*.js']
    })
;

mix.webpackConfig({
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/img',
            to: 'public/img', // Laravel mix will place this in 'public/img'
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