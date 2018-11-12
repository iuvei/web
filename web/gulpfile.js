/**
 * gulp
*/

var gulp         = require('gulp'),
    imageMin     = require('gulp-imagemin'),
   del = require('del');


gulp.task('image',function(){
  gulp.src('src/assets/**/*')
    .pipe(imageMin([
      imageMin.jpegtran({progressive: true}),
      imageMin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest('src/dist'))
})
gulp.task('clean', function(cb) {
    del(['src/dist/'], cb)
});

gulp.task('default', ['clean','image']);



