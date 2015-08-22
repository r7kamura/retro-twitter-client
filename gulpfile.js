var babel = require('gulp-babel');
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task(
  'compile',
  ['compile-es6', 'compile-scss']
);

gulp.task(
  'compile-es6',
  function () {
    return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'));
  }
);

gulp.task(
  'compile-scss',
  function () {
    gulp.src('assets/stylesheets/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('public/stylesheets'));
  }
);

gulp.task(
  'watch',
  function () {
    gulp.watch('{assets/stylesheets/**/*.scss,lib/**/*.js}', ['compile']);
  }
);
