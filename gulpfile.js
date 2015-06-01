var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
//var kss = require('gulp-kss');

/**
* Gulp errors
*/
function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}

/**
* Task watch
*/
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['public/styles/**/*.less', 'public/styles/**/*.css'], ['styles']);
    gulp.watch('public/js/**/*.js', ['js']);
});

/**
* Task styles: errors, autoprefixer, minified, rename, sourcemap, notify and livereload
*/
gulp.task('styles', function () {
    var less_src_import = 'public/styles/main.less';
    var less_dest_folder = 'public/styles/build/';

    var minOpts = {processImport:true, keepSpecialComments:false};

    return gulp.src(less_src_import)
        .pipe(less())
        .on('error', swallowError)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifycss(minOpts))
        .pipe(sourcemaps.init())
            .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(less_dest_folder))
        .pipe(notify("Less Compiled, Prefixed and Minified"))
        .pipe(livereload())
});

/**
* Task js minified
*/
gulp.task('js', function () {

    var dest_folder = 'public/js/build/';

    gulp.src(dest_folder + '/*', {read: false}).pipe(clean({force: true}));

    var src = [];

    src.push('public/vendor/jQuery/dist/jquery.min.js');
    src.push('public/js/main.js');

    return gulp.src(src)
        .on('error', swallowError)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest_folder))
        .pipe(notify({message:"Js minified"})
    );
});
