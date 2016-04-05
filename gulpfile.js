
const gulp             = require('gulp');
const watch            = require('gulp-watch');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageResize      = require('gulp-image-resize');
//const gulpForever      = require('gulp-forever');

//gulp.task('default', gulpForever(__filename, [ 'imagemin' ]));

gulp.task('imagemin', function() {
  return gulp.src('public/images/products/*.jpg')
    .pipe(watch('public/images/products/*.jpg'))
    .pipe(imageminMozjpeg({ quality: 70, progressive: true })())
    .pipe(imageResize({ width: 400 }))
    .pipe(gulp.dest('public/dist/images/products/400'))
    .pipe(imageResize({ width: 140 }))
    .pipe(gulp.dest('public/dist/images/products/140'));
});

//return gulp;
