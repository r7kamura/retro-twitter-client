var babel = require('gulp-babel');
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('build', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task(
  'watch',
  function () {
    gulp.watch('lib/**/*.js', ['build']);
  }
);
