var gulp = require('gulp');
var mjml = require('gulp-mjml');
var imagemin = require('gulp-imagemin');
var express = require('express');
var path = require('path');

var config = {
  views: {
    paths: ['src/views/**/*.mjml']
  }
};

gulp.task("images", function () {
  gulp.src("src/images/**/*.{jpg,jpeg,png,gif}")
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task("serve", function () {
  var app = express();
  app.use(express.static(path.join(__dirname, 'dist')));
  app.listen(3000);
});

gulp.task("watch", function () {
  gulp.watch(config.views.paths, ["compile"]);
});

gulp.task('compile', function () {
  gulp.src(config.views.paths)
    .pipe(mjml())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['images', 'compile', 'serve', 'watch']);
