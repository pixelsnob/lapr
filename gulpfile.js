
const gulp             = require('gulp');
const watch            = require('gulp-watch');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageResize      = require('gulp-image-resize');
const gulp_fn          = require('gulp-fn');
const image_size       = require('image-size');
const db               = require('./models');
const path             = require('path');


gulp.task('imagemin', function() {
  return gulp.src('public/images/products/*.{jpg,JPG}')
    .pipe(watch('public/images/products/*.{jpg,JPG}'))
    .pipe(gulp_fn(async function(file) {
      try {
        const dimensions = image_size(file.path);
        const res = await db.model('Image').update({
          name: path.basename(file.path)
        }, {
          $set: { width: dimensions.width, height: dimensions.height }
        });
      } catch (err) {
        console.error('Error retrieving/saving image dimensions!', file.path, err.message);
      }
      //this.next(file.path);
      return file.path;
    }, true))
    .pipe(imageminMozjpeg({ quality: 70, progressive: true })())
    .pipe(imageResize({ width: 400 }))
    .pipe(gulp.dest('public/dist/images/products/400'))
    .pipe(imageResize({ width: 140 }))
    .pipe(gulp.dest('public/dist/images/products/140'));
});

