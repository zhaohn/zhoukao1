/*
 * @Author: zhaohaonan 
 * @Date: 2018-11-05 08:46:17 
 * @Last Modified by: zhaohaonan
 * @Last Modified time: 2018-11-05 09:11:55
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean-css');
var server = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
gulp.task('devSass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'));
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devSass'));
})
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8080,
            host: '169.254.163.44',
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end();
                } else if (pathname === '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})
gulp.task('dev', gulp.parallel('devServer', 'devSass', 'watch'));