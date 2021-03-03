const { series, src, dest, watch, parallel } = require('gulp');
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin")
const notify = require("gulp-notify")
const concat = require("gulp-concat");

//utilidades css
const autoprefixer = require('autoprefixer')
const postcss = require("gulp-postcss");
const cssnano = require("cssnano")
const sourcemaps = require("gulp-sourcemaps")

const paths = {
    js: "src/js/**/*.js"
}
function css() {
    return src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(dest("./build/css"))
}

//utilidadesde js
const terser = require("gulp-terser-js")
const rename = require("gulp-rename")

function minificarcss() {
    return src("src/scss/app.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(dest("./build/css"))
}

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest("./build/js"))
}

function imagenes() {
    return src("src/img/**/*")
        .pipe(imagemin())
        .pipe(dest("./build/img"))
    //.pipe(notify({ message: "Imagen Minificada" }))
}
function watchArchivos() {
    watch("src/scss/**/*.scss", css) // * significa la carpeta actual , /**significa otras carpetas */
    watch(paths.js, javascript);
}

exports.css = css;
exports.minificarcss = minificarcss;
exports.watchArchivos = watchArchivos;
exports.imagenes = imagenes;

exports.default = series(css, javascript, imagenes, watchArchivos)