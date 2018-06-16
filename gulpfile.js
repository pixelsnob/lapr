
const gulp             = require('gulp');
const watch            = require('gulp-watch');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageResize      = require('gulp-image-resize');
const gulp_fn          = require('gulp-fn');
const image_size       = require('image-size');
const db               = require('./models');
const path             = require('path');
//const jimp             = require('gulp-jimp');

const src = 'public/images/products/*.{jpg,JPG}';

const storeImageDimensions = () =>
  gulp.src(src)
    .pipe(watch(src))
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
      return file.path;
    }, true));

const resizeImages400 = () =>
  gulp.src(src)
    .pipe(watch(src))
    .pipe(imageminMozjpeg({ quality: 40, progressive: true })())
    .pipe(imageResize({ width: 400 }))
    .pipe(gulp.dest('public/dist/images/products/400'))

const resizeImages140 = () =>
  gulp.src(src)
    .pipe(watch(src))
    .pipe(imageminMozjpeg({ quality: 90, progressive: true })())
    .pipe(imageResize({ width: 140 }))
    .pipe(gulp.dest('public/dist/images/products/140'));

const all = gulp.series(storeImageDimensions, resizeImages400, resizeImages140);

gulp.task('store-image-dimensions', storeImageDimensions);
gulp.task('resize-images-400', resizeImages400);
gulp.task('resize-images-140', resizeImages140);

gulp.task('default', all);


