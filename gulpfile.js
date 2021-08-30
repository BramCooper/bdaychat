const { src, dest } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

exports.sass2css = function () {
    return src('./source/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/app.css'));
}