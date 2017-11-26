let mix = require('laravel-mix');

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
