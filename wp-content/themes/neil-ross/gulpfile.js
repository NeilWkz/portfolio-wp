/*
Configured by hello@neilross.dev
Requires Gulp CLI Follow instructions here: https://gulpjs.com/

Usage:
'gulp' will run standard development environment and initiate BrowserSync with streaming css and live js reload 

You can also run the individual tasks eg:
'gulp css' or
'gulp js'
*/

// Load Gulp and plugins
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const jshint = require("gulp-jshint");
const prefix = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const size = require("gulp-size");
const uglify = require("gulp-uglify");

const server = browserSync.create();

const config = {
  sass: {
    dist: [`./`],
    src: [`scss/style.scss`],
  },
  js: {
    src: [
      "./src/js/jquery.validate.min.js",
      "./src/js/TweenMax.min.js",
      "./src/js/*.js",
      "./src/js/main.js",
    ],
    dest: "./dist/js/j.min.js",
  },
};

function reload(cb) {
  server.reload({ stream: true });
  cb();
}

function serve(cb) {
  server.init({
    proxy: "localhost:8000",
    port: 443,
    serveStatic: ["/wp-content/themes/neil-ross/dist/js"],
    serveStaticOptions: {
      extensions: ["css"], // pretty urls
    },
  });
  cb();
}

function js(cb) {
  gulp
    .src(config.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(concat(config.js.dest))
    .pipe(uglify())
    .pipe(gulp.dest("./"))
    .pipe(server.stream());
  cb();
}

function css(cb) {
  gulp
    .src(config.sass.src)
    .pipe(sass(config.sass.src))
    .on("error", sass.logError)
    .pipe(prefix())
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(config.sass.dist))
    .pipe(server.stream());
  cb();
}

function imgMin(cb) {
  gulp
    .src("img/*")
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
        ]
      })
    ]))
    .pipe(gulp.dest("dist/img"));
  cb();
}

const watch = function (cb) {
  gulp.watch(`scss/**/*.scss`, gulp.series(css, reload));
  gulp.watch(config.js.src, gulp.series(js, reload));
  gulp.watch("images/*", gulp.series(imgMin, reload));
  cb();
};
const dev = gulp.series(css, js, serve, watch);
const html = gulp.series(serve, watch);

const build = gulp.series(css, js);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.default = dev;
