let gulp = require("gulp");

gulp.task("copy",async ()=>{ 
    gulp.watch("./src/**/*",async ()=>{
        gulp.src("./src/**/*")
        .pipe(gulp.dest("F:\\phpStudy_64\\phpstudy_pro\\WWW\\ljm"));
    })
})