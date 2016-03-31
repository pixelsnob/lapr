
const gulp = require('gulp');
var imageminMozjpeg = require('imagemin-mozjpeg');

//const imageminJpegtran = require('imagemin-jpegtran');
//const imageminJpegtran = require('');

gulp.task('default', () => {
  return gulp.src('public/images/**/*.jpg')
    .pipe(imageminMozjpeg({ quality: 60, progressive: true })())
    .pipe(gulp.dest('public/dist/images'));
});
