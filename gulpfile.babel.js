import babel from "gulp-babel";
import gulp from "gulp";
import postcss from "gulp-postcss";
import sass from "gulp-sass";
import browserSync from "browser-sync";
import autoprefixer from "autoprefixer";

const server = browserSync.create();


gulp.task('styles', () => {
  gulp.src('./dev/scss/ed-ui.scss')
    .pipe(sass())
    .pipe(postcss(autoprefixer))
    .pipe(gulp.dest('./components'))
    .pipe(server.stream())
});

gulp.task('scripts', () => {
  gulp.src('./dev/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./components'))
});

gulp.task('default', () => {
  server.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['./*.html', './dev/*.js']).on('change',server.reload);
  gulp.watch('./dev/js/*.js', ['scripts']);
  gulp.watch('./dev/**/**.scss', ['styles']);
});
