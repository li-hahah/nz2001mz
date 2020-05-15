let gulp = require("gulp");
let htmlmin = require("gulp-htmlmin");
let sass = require("gulp-sass");
let cssmin = require("gulp-clean-css");
let uglify = require("gulp-uglify");
let babel = require("gulp-babel");

gulp.task("copy",async ()=>{ 
    // gulp.watch("./src/**/*",async ()=>{
    //     gulp.src("./src/**/*")
    //     .pipe(gulp.dest("F:\\phpStudy_64\\phpstudy_pro\\WWW\\ljm"));
    // })
    gulp.watch("./src/*.html",async ()=>{
        gulp.src("./src/*.html")
        .pipe(htmlmin({
            collapseWhitespace:true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest("F:\\phpStudy_64\\phpstudy_pro\\WWW\\ljm"));
    })

    gulp.watch("./src/sass/**/*",async ()=>{
        gulp.src("./src/sass/**/*")
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest("F:\\phpStudy_64\\phpstudy_pro\\WWW\\ljm\\css"));
    })
})

gulp.task("default",()=>
    gulp.watch("./src/js/**/*",async ()=>{
        gulp.src(["./src/js/**/*","!./src/js/jquery.js"])
        .pipe(babel({
            presets:['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest("F:\\phpStudy_64\\phpstudy_pro\\WWW\\mz\\js"))
    })

);