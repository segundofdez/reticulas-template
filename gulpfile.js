// common
var gulp = require('gulp');
var rename = require('gulp-rename');
var del = require('del');
var watch = require('gulp-watch');
var notify = require('gulp-notify');

// styles
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// html
var htmlmin = require('gulp-htmlmin');

// image optimization
var imagemin = require('gulp-imagemin');

// synchronised browser
var browserSync = require('browser-sync');


/**
* Gulp errors
*/
function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}


/**
* Task browserSync: start server
*/
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'public'
        },
    })
})


/**
* Task styles: less, errors, autoprefixer, minified, rename, notify, browserSync
*/
gulp.task('styles', function () {
    var less_src_import = 'public/styles/main.less';
    var less_dest_folder = 'public/styles/';

    var minOpts = {processImport:true, keepSpecialComments:false};

    return gulp.src(less_src_import)
        .pipe(less())
        .on('error', swallowError)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifycss(minOpts))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(less_dest_folder))
        .pipe(notify("Less compiled, prefixed and minified"))
        .pipe(browserSync.reload({
            stream: true
        }))
});


/**
* Task styles-dist: less, errors, autoprefixer, minified, rename, notify, browserSync
*/
gulp.task('styles-dist', function () {
    var less_src_import = 'public/styles/main.less';
    var less_dest_dist_folder = 'public/dist/styles/';

    var minOpts = {processImport:true, keepSpecialComments:false};

    return gulp.src(less_src_import)
        .pipe(less())
        .on('error', swallowError)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifycss(minOpts))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(less_dest_dist_folder))
        .pipe(notify({ message: 'Less minified' }));
});


/**
* Task images: optimize images to dist folder
*/
// Delete dist folder images
gulp.task('cleanimages', function() {
    return del([
        'public/dist/media/img/**/*'
    ]);
});

gulp.task('images',['cleanimages'], function(){
    var images_dest_folder = 'public/dist/media/img/';

    return gulp.src('public/media/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(images_dest_folder))
        .pipe(notify({ message: 'Optimized images' }));
});


/**
* Task html: minified html to dist folder
*/
gulp.task('htmlclean', function() {
    return del([
        'public/dist/**/*.html'
    ]);
});

gulp.task('html',['htmlclean'], function() {
    return gulp.src(['public/**/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public/dist/'))
        .pipe(notify({ message: 'Html minified' }));
});


/**
* Task watch
*/
gulp.task('watch', ['browserSync'], function () {
    gulp.watch(['public/styles/**/*.less'], ['styles']);
    //gulp.watch(['public/styles/**/*.less', 'public/styles/**/*.css'], ['styles']);
    gulp.watch('public/**/*.html', browserSync.reload);
    //gulp.watch('public/js/**/*.js', ['js'], browserSync.reload);
    //gulp.watch('public/media/img/**/*', ['images']);
});


/**
* Task prod: Copy to dist folder for production
*/
gulp.task('prod', ['styles-dist', 'html', 'images']);
