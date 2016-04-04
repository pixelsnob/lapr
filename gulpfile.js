
const gulp = require('gulp');
const watch = require('gulp-watch');
const imageminMozjpeg = require('imagemin-mozjpeg');

return gulp.task('imagemin', function() {
  return gulp.src('public/images/products/*.jpg')
    .pipe(watch('public/images/products/*.jpg'))
    .pipe(imageminMozjpeg({ quality: 60, progressive: true })())
    .pipe(gulp.dest('public/dist/images/products'));
});
