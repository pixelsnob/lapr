
const gulp             = require('gulp');
const watch            = require('gulp-watch');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageResize      = require('gulp-image-resize');
const gulp_fn          = require('gulp-fn');
const image_size       = require('image-size');
const db               = require('./models');
const path             = require('path');
const execSync         = require('sync-exec');
const jimp             = require('gulp-jimp');
const fs               = require('fs');
const modifyFile       = require('gulp-modify-file');
const rename           = require('gulp-rename');

const src = 'public/images/products/*.{jpg,JPG}';

// Save image dimensions to the db for calculating aspect ratio, etc.
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

const cropImages = () => {
  gulp.src(src)
    .pipe(watch(src))
    // Couldn't get any other smartcrop solution to work: save cropped image to a file, read
    // the file, and pass it along to the next pipe()
    .pipe(modifyFile((content, file_path, file) => {
      const dest_dir = 'public/dist/images/products/crop';
      if (!fs.existsSync(dest_dir)) {
        fs.mkdirSync(dest_dir);
      }
      const dest = path.resolve(dest_dir, path.basename(file_path));
      const command = `smartcrop --width=260 --height=200 --quality=100 ${file.path} ${dest}`;
      const out = execSync(command, 5000);
      console.log(`Saved cropped image ${dest}`);
      // Point the pipe to the newly created file 
      return fs.readFileSync(dest);
    }))
    .pipe(jimp({
      '-blur': {
        blur: 16
      }
    }))
    .pipe(rename(path => {
      path.basename = path.basename.replace('-blur', '');
    }))
    .pipe(gulp.dest('public/dist/images/products/crop-blur'));
};

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

const all = () => gulp.series(
  storeImageDimensions,
  resizeImages400,
  resizeImages140,
  cropImages
);

// Execute
gulp.task('store-image-dimensions', storeImageDimensions);
gulp.task('resize-images-400', resizeImages400);
gulp.task('resize-images-140', resizeImages140);
gulp.task('crop-images', cropImages);

gulp.task('default', all);


