const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const concat = require('gulp-concat');
const useref = require('gulp-useref');

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
});

gulp.task('html', () => {
    gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('./'));
});

gulp.task('css', () => {
    gulp.src('src/assets/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
    gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/index.html').on('change', browserSync.reload);
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
    gulp.watch('src/assets/*.css').on('change', browserSync.reload);
});

gulp.task('del', () => {
    del(['dist', 'index.html']);
});

gulp.task('default', ['serve', 'watch']);
gulp.task('build', ['html', 'css', 'js']);
