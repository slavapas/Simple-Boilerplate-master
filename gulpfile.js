const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


gulp.task('pug', function() {
    return gulp.src('src/pug/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe (gulp.dest('src'))
        .pipe(browserSync.reload({stream: true}));
})

gulp.task('sass', function () {   
    return gulp.src('src/sass/main.sass')
           .pipe(sass())
           .pipe(autoprefixer())
           .pipe(gulp.dest('src/css')) 
           .pipe(browserSync.reload({stream: true}));
 })

 gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.sass', gulp.series('sass', 'reload'));
    gulp.watch('src/pug/**/*.pug', gulp.series('pug', 'reload'));
})

gulp.task('serve', function(){
    browserSync.init({
        server: 'src',
        port: 4000
    });
})

gulp.task('reload', function(done){
    browserSync.reload();
    done();
})

gulp.task('default', gulp.parallel('serve', 'watch'));