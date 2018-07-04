
const gulp             = require('gulp');
const watch            = require('gulp-watch');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageResize      = require('gulp-image-resize');
const gulp_fn          = require('gulp-fn');
const image_size       = require('image-size');
const db               = require('./models');
const path             = require('path');
const execSync         = require('sync-exec');

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
    }));

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


const cropImage = file => {
  return new Promise((resolve, reject) => {
    const dest = path.resolve('public/dist/images/products/crop', path.basename(file.path));
  });
};

const cropImages = () => {
  gulp.src(src)
    .pipe(gulp_fn(file => {
      const dest = path.resolve('public/dist/images/products/crop', path.basename(file.path));
      const command = `smartcrop --width=260 --height=200 --quality=80 ${file.path} ${dest}`;
      const out = execSync(command, 5000);
      return dest;
    }));
};

const all = () => gulp.series(
  storeImageDimensions,
  resizeImages400,
  resizeImages140,
  cropImages
);

gulp.task('store-image-dimensions', storeImageDimensions);
gulp.task('resize-images-400', resizeImages400);
gulp.task('resize-images-140', resizeImages140);
gulp.task('crop-images', cropImages);

gulp.task('default', all);


