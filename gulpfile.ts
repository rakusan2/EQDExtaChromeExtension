import * as gulp from "gulp"
import * as sass from "gulp-sass"
import * as tsc from "gulp-typescript"
import * as ots from "typescript"

const tsOptions:tsc.Settings = {
    target:"es5",
    typescript:ots
}, sassOptions: sass.Options = {
    outputStyle:'expanded'
}

gulp.add('js',()=>{

})

gulp.add('css',()=>{

})

gulp.add("default",['js','css'])

gulp.add("watch",()=>{
    gulp.watch('lib/*.ts',['js']);
    gulp.watch('lib/*.scss',['css'])
})

gulp.add("buld",()=>{

})
