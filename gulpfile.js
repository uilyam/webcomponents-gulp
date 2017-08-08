const gulp = require('gulp');
const bs = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const reload = bs.reload;

const sassFunc = function() {
    return gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(debug({title: 'sass:'}))
        .pipe(gulp.dest(function (file){
            return file.base;
        }))
}

const sassWatchFunc = function() {
    gulp.watch(['./sass/**/*.scss', 'src/**/*.scss'], ['sass']);
}

const jsFunc = function() {
    return gulp.src(['./src/**/*.js', '!./src/**/*.es2015.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename(function (path) {
            path.basename += ".es2015"
        }))
        .pipe(debug({title: 'babel:'}))
        .pipe(gulp.dest(function(file){
            return file.base;
        }));
}

const jsWatchFunc = function() {
    gulp.watch('./src/**/*.js', ['js']);
}

const browserSyncFunc = function() {
    bs.init({
        server: {
            baseDir: "."
        }
    });
}

const defaultFunc = function() {
    gulp.watch('index.html').on('change', reload);
    gulp.watch('src/**/*.css').on('change', reload);
    gulp.watch('src/**/*.html').on('change', reload);
    gulp.watch('src/**/*.js').on('change', reload);
}
gulp.task('sass', sassFunc);
gulp.task('sass:watch', sassWatchFunc);
gulp.task('js', jsFunc);
gulp.task('js:watch', jsWatchFunc);
gulp.task('browser-sync', browserSyncFunc);
gulp.task('default', ['js', 'sass', 'sass:watch', 'js:watch', 'browser-sync'], defaultFunc);