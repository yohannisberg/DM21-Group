let gulp = require('gulp')
    , sourcemaps = require('gulp-sourcemaps')
    , sass = require('gulp-sass')
    , concat = require('gulp-concat')
    , CacheBuster = require('gulp-cachebust')
    , cachebust = new CacheBuster()
    , print = require('gulp-print')
    , babel = require('gulp-babel')
    , es2015 = require('babel-preset-es2015')
    // , uglify = require('gulp-uglify')
    , ngAnnotate = require('gulp-ng-annotate')

gulp.task('views' , function (){
    return gulp.src('./public/views/**/*')
        .pipe(gulp.dest('./dist/views'))

});


gulp.task('build-css', function () {

    return gulp.src('./public/CSS/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(cachebust.resources())
        // .pipe(concat('./public/styles.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('build-js', function () {
    return gulp.src('./public/JS/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['views', 'build-css', 'build-js'], function () {
    return gulp.src('./public/index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    return gulp.watch(['./index.html', './styles/*.*css', './js/**/*.js'], ['build']);
});



gulp.task('default' , ['build', 'watch']);


