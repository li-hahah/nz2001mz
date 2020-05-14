let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");

gulp.task("copy",async ()=>{ 
    // gulp.watch("./src/**/*",async ()=>{
    //     gulp.src("./src/**/*")
    //     .pipe(gulp.dest("F:\\phpStudy_64\\phpstudy_pro\\WWW\\ljm"));
    // })
    gulp.watch("./src/*.html",async ()=>{
        gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true,
            removeComments: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest("F:\\phpStudy_64\\phpstudy_pro\\WWW\\ljm"));
    })
})