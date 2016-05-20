
const gulp             = require('gulp');
const watch            = require('gulp-watch');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageResize      = require('gulp-image-resize');

gulp.task('imagemin', function() {
  return gulp.src('public/images/products/*.{jpg,JPG}')
    .pipe(watch('public/images/products/*.{jpg,JPG}'))
    .pipe(imageminMozjpeg({ quality: 70, progressive: true })())
    .pipe(imageResize({ width: 400 }))
    .pipe(gulp.dest('public/dist/images/products/400'))
    .pipe(imageResize({ width: 140 }))
    .pipe(gulp.dest('public/dist/images/products/140'));
});

//return gulp;
