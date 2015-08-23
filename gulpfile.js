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
      .pipe(gulp.dest('app/'));
  }
);

gulp.task(
  'compile-scss',
  function () {
    gulp.src('src/**/*.scss')
      .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'watch',
  function () {
    gulp.watch('src/**/*.js', ['compile']);
  }
);
