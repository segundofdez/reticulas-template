// common
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),

    // styles
    less = require('gulp-less');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),

    // html
    htmlmin = require('gulp-htmlmin'),

    // image optimization
    imagemin = require('gulp-imagemin'),

    // synchronised browser
    browserSync = require('browser-sync'),

    // js
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');


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
* Task less: less, errors, autoprefixer, minified, rename, notify, browserSync
*/

gulp.task('lessclean', function() {
    return del('public/dist/styles');
});

gulp.task('less-dist',['lessclean'], function() {
   gulp.src('public/styles/main.min.css')
   .pipe(gulp.dest('public/dist/styles'));
});

gulp.task('less', function () {
    var less_src_import = 'public/styles/main.less';
    var less_dest_folder = 'public/styles/';

    var minOpts = {processImport:true, keepSpecialComments:false};

    return gulp.src(less_src_import)
        .pipe(less())
        .on('error', swallowError)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifycss(minOpts))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(less_dest_folder))
        .pipe(notify("Less compiled, prefixed and minified"))
        .pipe(browserSync.reload({
            stream: true
        }))
});


/**
* Html minified to disc folder
*/
gulp.task('htmlclean', function() {
    return del('public/dist/**/*.html');
});

gulp.task('html-dist',['htmlclean'], function() {
    return gulp.src(['public/**/*.html'])
    .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyElements: true,
        minifyJS: true,
        minifyCSS: true
    }))
    .pipe(gulp.dest('public/dist/'))
});


/**
* Task images: optimize images to dist folder
*/
gulp.task('imagesclean', function() {
    return del('public/dist/media/img/**/*');
});
gulp.task('images-dist',['imagesclean'], function(){
    var images_dest_folder = 'public/dist/media/img/';

    return gulp.src('public/media/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(images_dest_folder))
        .pipe(browserSync.reload({
            stream: true
        }))
});


/**
* Task gulp-watch
*/
gulp.task('watch', ['browserSync', 'less'], function () {
    gulp.watch(['public/styles/**/*.less'], ['less']);
    //gulp.watch(['public/styles/**/*.less', 'public/styles/**/*.css'], ['styles']);
    gulp.watch('public/**/*.html',  browserSync.reload);
    //gulp.watch('public/js/**/*.js',['js'], browserSync.reload);
    gulp.watch('public/media/img/**/*', ['images-dist']);
});


/**
* Task dist: Copy to dist folder for production
*/
gulp.task('dist', ['less-dist', 'html-dist', 'images-dist']);









/**
* Task js concat and minified
*/
gulp.task('js', function () {

    var dest_folder = 'public/js/';

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

/**
* Task js-dist: copy js to dist folder
*/
gulp.task('js-dist', function() {
   gulp.src('public/js/main.min.js')
   .pipe(gulp.dest('public/dist/js'));
});



/**
* Task clean: delete dist folder before make the building for production

gulp.task('clean', function() {
  del('public/dist/*');
})
*/


/**
* Task dist: Copy to dist folder for production

gulp.task('dist', ['clean', 'less-dist', 'html' , 'js', 'images'], function (){
    console.log('Building dist folder');
})
*/