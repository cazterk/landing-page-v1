// Initialize modules
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
// in your gulpfile
const fileExists = require("file-exists");
const gulpif = require("gulp-if");
var gulp = require("gulp");

// Sass Task
function scssTask() {
  return src("app/scss/style.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

// fontawesome
const webFontsPath = "./node_modules/@fortawesome/fontawesome-free/webfonts/*";
const distWebfonts = "dist/webfonts";

// use a file of webfonts to check it's existing then make a copy in dist
const fontawesomeWebfont =
  "./node_modules/@fortawesome/fontawesome-free/webfonts/fa-brands-400.eot";

// to check if file exists or not for testing purposes
console.log(fileExists.sync(fontawesomeWebfont)); // OUTPUTS: true or false

// copy webfonts folder if it exists
// because our task contains asynchronous code
// use async before our task
// to avoid getting this error `Did you forget to signal async completion`
async function copyfontawesomeWebfontsTask() {
  return gulpif(
    fileExists.sync(fontawesomeWebfont),
    src([webFontsPath]).pipe(dest(distWebfonts))
  );
}

// JavaScript Task
function jsTask() {
  return src("app/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["app/scss/**/*.scss", "app/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(
  copyfontawesomeWebfontsTask,
  scssTask,
  jsTask,
  browserSyncServe,
  watchTask
);

exports.build = series(copyfontawesomeWebfontsTask, scssTask, jsTask);
