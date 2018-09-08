var gulp = require('gulp');

var server = require('gulp-webserver');
var url = require('url');
var fs = require('fs');
var path = require('path');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minCss = require('gulp-clean-css');

var uglify = require('gulp-uglify');

var listData = require('./src/mock/list.json');


//开发环境---启服务
gulp.task('devServer', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 6345,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                //处理icon
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return
                };
                //判断接口/页面
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 0, data: listData }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

//开发环境---编译scss,合并css,压缩css
gulp.task('devCss', function() {
    return gulp.src('./src/sacc/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});

//开发环境---监听css
gulp.task('watch', function() {
    return gulp.watch('./src/sacc/*.scss', gulp.series('devCss'));
});

//压缩js
gulp.task('minJs', function() {
    return gulp.src(['./src/js/*.js', '!./src/js/libs/**/*.js']) //切记两个参数时是数组格式
        .pipe(uglify())
        .pipe(gulp.dest('./src/bulid/minJs'))
})


//开发环境

gulp.task('dev', gulp.series('devCss', 'devServer', 'minJs', 'watch'))