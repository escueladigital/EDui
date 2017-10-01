import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import watch from 'gulp-watch';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';

const server = browserSync.create();

const postcssPlugins = [
  cssnano({
    core: false, // true for minified output
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
];

// Sass
gulp.task('styles', () =>
  gulp.src('./src/scss/ed-ui.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./examples/css'))
    .pipe(server.stream({match: '**/*.css'}))
);

// Gulp
gulp.task('pug', () =>
  gulp.src('./src/examples-pages/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./examples'))
);

// Scripts
gulp.task('scripts', () =>
  browserify('./src/js/ed-ui.js', {
    standalone: 'ed-ui'
  })
    .transform(babelify)
    .bundle()
    .on('error', function(err){
      console.error(err);
      this.emit('end')
    })
    .pipe(source('ed-ui.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./examples/js'))
);

// Default (server and watch)
gulp.task('default', () => {
  server.init({
    server: {
      baseDir: './examples'
    },
  });

  watch('./src/scss/**/*.scss', () => gulp.start('styles'));
  watch('./src/js/**/*.js', () => gulp.start('scripts',server.reload) );
  watch('./src/examples-pages/**/*.pug', () => gulp.start('pug', server.reload) );
});
