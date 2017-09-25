import babel from "gulp-babel";
import gulp from "gulp";
import postcss from "gulp-postcss";
import sass from "gulp-sass";
import pug from "gulp-pug";
import browserSync from "browser-sync";
import autoprefixer from "autoprefixer";

const server = browserSync.create();

gulp.task('styles', () => {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(postcss(autoprefixer))
    .pipe(gulp.dest('./dist/css'))
    .pipe(server.stream())
});

gulp.task('scripts', () => {
  gulp.src('./src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
});
gulp.task('html', () => {
  gulp.src('./src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./examples'))
});

gulp.task('default', ['html', 'styles', 'scripts'], () => {
  server.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['./*.html', './src/*.js']).on('change', server.reload);
  gulp.watch('./src/pug/*.pug', ['html']).on('change', server.reload);
  gulp.watch('./src/js/*.js', ['scripts']).on('change', server.reload);
  gulp.watch('./src/scss/**/*.scss', ['styles']);
});