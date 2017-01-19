import * as gulp from "gulp"
import * as sass from "gulp-sass"
import * as crx from "gulp-crx-pack"
import * as fs from "fs"
import * as browserify from "browserify"
import * as tsify from "tsify"
import * as source from "vinyl-source-stream"
import * as watchify from "watchify"

const sassOptions: sass.Options = {
        outputStyle:'expanded'
    },crxOptions:crx.options = {
        privateKey:fs.readFileSync('build/ChromeEQDExt.pem','utf8'),
        filename:'eqdExtra.crx'
    }

function combinejs(){

    [['lib/backScript.ts','backScript.js'],['lib/eqd-inject.ts','eqd-inject.js'],['lib/eqdComment-inject.ts','eqdComment-inject.js']].forEach(f=>{
    let b= watchify(browserify({entries:f[0]})),
        bundle = ()=>{
            b.bundle()
                .pipe(source(f[1]))
                .pipe(gulp.dest('build/files/lib'))
        }
        b.plugin(tsify)
        b.on('update',bundle)
        b.on('log',console.log)
        console.log(f[0])
        bundle()
    })
}

gulp.add('js',combinejs)

gulp.add('css',()=>{
    gulp.src('lib/*.scss')
        .pipe(sass(sassOptions))
        .pipe(gulp.dest('build/files/lib'))
})

gulp.add("default",['js','css'])

gulp.add("watch",['build'],()=>{
    gulp.watch('lib/*.scss',['css'])
})

gulp.add("build",['js','css'],()=>{
    gulp.src(['manifest.json','popup.html','images/*'],{base:'.'})
        .pipe(gulp.dest('build/files'))
})

gulp.add('crx',['build'],()=>{
    gulp.src('build/files')
        .pipe(crx(crxOptions))
        .pipe(gulp.dest('build'))
})