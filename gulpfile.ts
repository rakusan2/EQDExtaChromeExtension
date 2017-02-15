import * as browserify from "browserify"
import * as gulp from "gulp"
import * as crx from "gulp-crx-pack"
import * as rename from "gulp-rename"
import * as sass from "gulp-sass"
import * as uglify from "gulp-uglify"
import * as gutil from "gulp-util"
import * as fs from "fs"
import * as tsify from "tsify"
import * as buffer from "vinyl-buffer"
import * as source from "vinyl-source-stream"
import * as watchify from "watchify"
import {assign} from "lodash"

const sassOptions: sass.Options = {
    outputStyle: 'expanded'
}, crxOptions = (): crx.options => {
    return {
        privateKey: fs.readFileSync('build/ChromeEQDExt.pem', 'utf8'),
        filename: 'eqdExtra.crx'
    }
}

function combinejs(update: boolean, minify: boolean) {
    ['backScript.ts', 'eqd-inject.ts', 'eqdComment-inject.ts','eqd-script-inject.ts'].forEach(f => {
        let b = browserify(assign({},watchify.args,{basedir:'src/', entries: f})),
            bundle = () => {
                let pipe = b.bundle().on('error',gutil.log)
                    .pipe(source(f)).pipe(rename({extname:'.js'}))
                if (minify) {
                    pipe = pipe.pipe(buffer()).pipe(uglify())
                }
                pipe.pipe(gulp.dest('build/files/src'))
            }
        b.plugin(tsify)
        if (update){
            b.plugin(watchify,{})
            b.on('update',()=>{
                console.log({update:f})
                bundle()
            })
        }
        b.on('log', console.log)
        console.log(f)
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

gulp.add("default", ['copyFiles','js', 'css'])
gulp.add('build',['copyFiles','css'],()=>{
    combinejs(false,false)
})

gulp.add("watch", ['copyFiles', 'css'], () => {
    combinejs(true, false)
    gulp.watch('src/*.scss', ['css'])
})

gulp.add('crx', ['build'], () => {
    gulp.src('build/files')
        .pipe(crx(crxOptions()))
        .pipe(gulp.dest('build'))
})