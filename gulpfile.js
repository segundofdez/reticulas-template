// common
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    runSequence = require('run-sequence'),

    // styles
    less = require('gulp-less');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),

    // html
    htmlmin = require('gulp-htmlmin'),

    // image optimization
    imagemin = require('gulp-imagemin'),

    // synchronised browser
    browserSync = require('browser-sync'),

    // js
    concat = require('gulp-concat'),
    fs = require('fs'),
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
* Task less: less, errors, autoprefixer, minified, rename, notify, sourcemaps and browserSync
*/
gulp.task('less', function () {
    var less_src_import = 'public/styles/main.less';
    var less_dest_folder = 'public/styles/';

    var minOpts = {processImport:true, keepSpecialComments:false};

    return gulp.src(less_src_import)
        .pipe(less())
        .on('error', swallowError)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(minifycss(minOpts))
        .pipe(sourcemaps.init())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(less_dest_folder))
        .pipe(notify("Less compiled, prefixed and minified"))
        .pipe(browserSync.reload({
            stream: true
        })
    )
});


/**
* Task js concat and minified
*/
gulp.task('js', function () {

    var dest_folder = 'public/js/';
    var vendorJs = JSON.parse(fs.readFileSync('./public/js/js.json'));
    var src = [];

    for(var item in vendorJs.js) {
        src.push(vendorJs.js[item].src);
    }

    del('public/js/main.min.js');

    return gulp.src(src)
        .on('error', swallowError)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dest_folder))
        .pipe(notify({message:"Compress js"})
        .pipe(browserSync.reload({
            stream: true
        }))
    );
});


/**
* Delete dist folder
*/
gulp.task('del-dist', function() {
    del('public/dist/**/*');
});

/**
* Less minified to dist folder
*/
gulp.task('less-dist', function() {
    gulp.src(['public/styles/main.min.css', 'public/styles/main.min.css.map'])
    .pipe(gulp.dest('public/dist/styles'));
});

/**
* Task js-dist: copy js to dist folder
*/
gulp.task('js-dist', function() {
   gulp.src('public/js/main.min.js')
   .pipe(gulp.dest('public/dist/js'));
});

/**
* Html minified to dist folder
*/
gulp.task('html-dist', function() {
    return gulp.src(['public/**/*.html', '!public/dist/**/*'])
    .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyElements: true,
        minifyJS: true,
        minifyCSS: true
    }))
    .pipe(gulp.dest('public/dist/'));
});

/**
* Task images-dist: optimize images to dist folder
*/
gulp.task('images-dist',function(){
    var images_dest_folder = 'public/dist/media/img/';

    return gulp.src('public/media/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(images_dest_folder));
});

/**
* Task server-dist: copy server files to dist folder
*/
gulp.task('server-dist', function() {
    gulp.src(['public/humans.txt', 'public/robots.txt', 'public/.htaccess'])
    .pipe(gulp.dest('public/dist/'));
});


/**
* Task make-dist: create dist folder
*/
gulp.task('dist', function(callback) {
    runSequence(
        'del-dist',
        'less-dist',
        'js-dist',
        'html-dist',
        'images-dist',
        'server-dist',
        callback
    );
});


/**
* Task gulp-watch
*/
gulp.task('watch', ['browserSync'], function () {
    gulp.watch(['public/styles/**/*.less'], ['less']);
    gulp.watch('public/**/*.html', browserSync.reload);
    gulp.watch(['public/js/main.js', 'public/js/js.json'], ['js']);
});
