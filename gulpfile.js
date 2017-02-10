"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var crx = require("gulp-crx-pack");
var fs = require("fs");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var watchify = require("watchify");
var uglify = require("gulp-uglify");
var gutil = require("gulp-util");
var sassOptions = {
    outputStyle: 'expanded'
}, crxOptions = function () {
    return {
        privateKey: fs.readFileSync('build/ChromeEQDExt.pem', 'utf8'),
        filename: 'eqdExtra.crx'
    };
};
function combinejs(update, minify) {
    [['src/backScript.ts', 'backScript.js'], ['src/eqd-inject.ts', 'eqd-inject.js'], ['src/eqdComment-inject.ts', 'eqdComment-inject.js']].forEach(function (f) {
        var b = browserify({ entries: f[0] }), bundle = function () {
            var pipe = b.bundle().on('error', gutil.log)
                .pipe(source(f[1]));
            if (minify)
                pipe = pipe.pipe(buffer()).pipe(uglify());
            pipe.pipe(gulp.dest('build/files/src'));
        };
        b.plugin(tsify);
        if (update) {
            b.plugin(watchify);
            b.on('update', bundle);
        }
        b.on('log', console.log);
        console.log(f[0]);
        bundle();
    });
}
gulp.add('js', function () { return combinejs(false, true); });
gulp.add('css', function () {
    gulp.src('lib/*.scss')
        .pipe(sass(sassOptions))
        .pipe(gulp.dest('build/files/src'));
});
gulp.add('copyFiles', function () {
    gulp.src(['manifest.json', 'popup.html', 'images/*'], { base: '.' })
        .pipe(gulp.dest('build/files'));
});
gulp.add("default", ['js', 'css']);
gulp.add("watch", ['copyFiles', 'css'], function () {
    combinejs(true, false);
    gulp.watch('src/*.scss', ['css']);
});
gulp.add("build", ['copyFiles', 'js', 'css']);
gulp.add('crx', ['build'], function () {
    gulp.src('build/files')
        .pipe(crx(crxOptions()))
        .pipe(gulp.dest('build'));
});
