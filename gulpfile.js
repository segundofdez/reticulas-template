// common
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

// styles
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

// html
var htmlmin = require('gulp-htmlmin');

// image optimization
var imagemin = require('gulp-imagemin');

// test generate styleguide
var styleguide = require('sc5-styleguide');
var outputPath = 'styleguide';


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
    gulp.watch('public/**/*.html', ['html']);
    gulp.watch('public/media/img/**/*', ['images']);
});


/**
* Html minified and livereload
*/
gulp.task('htmlclean', function() {
    return gulp.src(['public/dist/**/*.html'])
    .pipe(clean());
});


gulp.task('html',['htmlclean'], function() {
    return gulp.src(['public/**/*.html'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public/dist/'))
    .pipe(livereload());
});


/**
* Task styles: errors, autoprefixer, minified, rename, sourcemap, notify and livereload
*/
gulp.task('styles', function () {
    var less_src_import = 'public/styles/main.less';
    var less_dest_folder = 'public/styles/';
    var less_dest_dist_folder = 'public/dist/styles/';

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
        .pipe(gulp.dest(less_dest_dist_folder))
        .pipe(notify("Less compiled, prefixed and minified"))
        .pipe(livereload())
});


/**
* Task js concat and minified
*/
gulp.task('js', function () {

    var dest_folder = 'public/dist/js/';

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


/**
* Task images optimize images with gulp-imagemin
*/
// Delete the build images directory
gulp.task('cleanimages', function() {
    return gulp.src('public/dist/media/img/')
    .pipe(clean());
});

gulp.task('images',['cleanimages'], function () {
    return gulp.src('public/media/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('public/dist/media/img/'))
        .pipe(notify({ message: 'Optimized images' }));
});


/**
* Task styleguide to generate styleguide
*/
gulp.task('styleguide:generate', function() {
  return gulp.src('public/styles/**/*.less')
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        server: true,
        rootPath: outputPath,
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src('public/styles/main.less')
    .pipe(less({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
