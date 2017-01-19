"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var crx = require("gulp-crx-pack");
var fs = require("fs");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var sassOptions = {
    outputStyle: 'expanded'
}, crxOptions = {
    privateKey: fs.readFileSync('build/ChromeEQDExt.pem', 'utf8'),
    filename: 'eqdExtra.crx'
};
function combinejs() {
    [['lib/backScript.ts', 'backScript.js'], ['lib/eqd-inject.ts', 'eqd-inject.js'], ['lib/eqdComment-inject.ts', 'eqdComment-inject.js']].forEach(function (f) {
        var b = watchify(browserify({ entries: f[0] })), bundle = function () {
            b.bundle()
                .pipe(source(f[1]))
                .pipe(gulp.dest('build/files/lib'));
        };
        b.plugin(tsify);
        b.on('update', bundle);
        b.on('log', console.log);
        console.log(f[0]);
        bundle();
    });
}
gulp.add('js', function () {
    combinejs();
    //gulp.src('lib/*.ts')
    //    .pipe(tsc(tsOptions))
    //    .pipe(gulp.dest('lib'))
});
gulp.add('css', function () {
    gulp.src('lib/*.scss')
        .pipe(sass(sassOptions))
        .pipe(gulp.dest('build/files/lib'));
});
gulp.add("default", ['js', 'css']);
gulp.add("watch", ['build'], function () {
    gulp.watch('lib/*.scss', ['css']);
});
gulp.add("build", ['js', 'css'], function () {
    gulp.src(['manifest.json', 'popup.html', 'images/*'], { base: '.' })
        .pipe(gulp.dest('build/files'));
});
gulp.add('crx', ['build'], function () {
    gulp.src('build/files')
        .pipe(crx(crxOptions))
        .pipe(gulp.dest('build'));
});
