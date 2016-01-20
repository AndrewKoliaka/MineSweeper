var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var baseDir = 'app/';
// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: baseDir
    }
  });

  gulp.watch([baseDir + 'index.html',baseDir + 'js/*.js'], reload);
});

gulp.task('default', ['serve']);