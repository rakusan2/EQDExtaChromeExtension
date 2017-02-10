import * as gulp from "gulp"
import * as sass from "gulp-sass"
import * as crx from "gulp-crx-pack"
import * as fs from "fs"
import * as browserify from "browserify"
import * as tsify from "tsify"
import * as source from "vinyl-source-stream"
import * as buffer from "vinyl-buffer"
import * as watchify from "watchify"
import * as uglify from "gulp-uglify"
import * as gutil from "gulp-util"

const sassOptions: sass.Options = {
    outputStyle: 'expanded'
}, crxOptions = (): crx.options => {
    return {
        privateKey: fs.readFileSync('build/ChromeEQDExt.pem', 'utf8'),
        filename: 'eqdExtra.crx'
    }
}

function combinejs(update: boolean, minify: boolean) {

    [['src/backScript.ts', 'backScript.js'], ['src/eqd-inject.ts', 'eqd-inject.js'], ['src/eqdComment-inject.ts', 'eqdComment-inject.js']].forEach(f => {
        let b = browserify({ entries: f[0]}),
            bundle = () => {
                let pipe = b.bundle().on('error',gutil.log)
                    .pipe(source(f[1]))
                if (minify) pipe = pipe.pipe(buffer()).pipe(uglify());
                pipe.pipe(gulp.dest('build/files/src'))
            }
        b.plugin(tsify)
        if (update){
            b.plugin(watchify)
            b.on('update', bundle)
        }
        b.on('log', console.log)
        console.log(f[0])
        bundle()
    })
}

gulp.add('js', () => combinejs(false, true))

gulp.add('css', () => {
    gulp.src('src/*.scss')
        .pipe(sass(sassOptions))
        .pipe(gulp.dest('build/files/src'))
})
gulp.add('copyFiles', () => {
    gulp.src(['manifest.json', 'popup.html', 'images/*'], { base: '.' })
        .pipe(gulp.dest('build/files'))
})

gulp.add("default", ['js', 'css'])

gulp.add("watch", ['copyFiles', 'css'], () => {
    combinejs(true, false);
    gulp.watch('src/*.scss', ['css'])
})

gulp.add("build", ['copyFiles', 'js', 'css'])

gulp.add('crx', ['build'], () => {
    gulp.src('build/files')
        .pipe(crx(crxOptions()))
        .pipe(gulp.dest('build'))
})