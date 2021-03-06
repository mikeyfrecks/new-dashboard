var buildDir = 'dash-prod';

//GENERAL MODULES
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    plumber = require('gulp-plumber'),
    extract = require("gulp-html-extract");
//CSS PROCESSING
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var rename = require("gulp-rename");
var removeCode = require('gulp-remove-code');

var del = require('del'); // rm -rf
//

function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  // If you are using del 2.0 or above, return its promise
  return del(['../'+buildDir+'/**'], {force:true});
}
gulp.task('clean', function(){
  clean();
});

//Generic sass Processor
function sassProcessor(blob, dest) {
   gulp.src(blob)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dest));
}
//Generic js Processor
function jsProcessor(blob, dest, newName) {
  return gulp.src(blob)
    .pipe(plumber())
    .pipe(babel({
        presets: [["es2015", { "modules": false }]]
    }))
    .pipe(replace('$(', 'jQuery('))
    .pipe(concat(newName))
    .pipe(gulp.dest(dest));
}
//Generic html Processor

gulp.task('vue-components',function(){
  gulp.src('dashview/components/*.html')
    .pipe(extract({
    sel: "script",
    strip: true
    }))
    .pipe(rename(function (path) {
    path.dirname = "";
    path.extname = ".js";
    }))
    .pipe(plumber())
    .pipe(babel({
        presets: [["es2015", { "modules": false }]]
    }))
    .pipe(gulp.dest('../'+buildDir+'/dashview/components/js'));
  gulp.src('dashview/components/*.html')
  .pipe(removeCode({ script: true }))
    .pipe(rename(function (path) {
    path.dirname = "";
    path.extname = ".html";
    }))
    .pipe(gulp.dest('../'+buildDir+'/dashview/components/templates'));
});


//SASS CSS TASK
gulp.task('sass', function () {
  sassProcessor(['sass/main.scss', 'sass/todolist.scss','sass/expanded.scss','sass/ie-fixes.scss','sass/editor-styles.scss'], '../'+buildDir+'/css');
});

//JS TASK
gulp.task('js', function () {
  jsProcessor([ 'js/plugins/*.js', 'js/site.js', 'js/modules/*.js'], '../'+buildDir+'/js', 'main.js');
  jsProcessor('todo/scripts/*.js','../'+buildDir+'/todo','main.js');
});



//HTML TASK
gulp.task('templatecrush', function() {
  dumper(['*.php','*.html','!custom-module-functions.php','plugin-*.js'], '../'+buildDir);
  dumper(['todo/*.php','todo/*.html','!custom-module-functions.php'], '../'+buildDir+'/todo');
});
gulp.task('todoassets', function() {

  dumper(['todo/assets/**/*'], '../'+buildDir+'/todo/assets');
});





//DUMPS
function dumper(src, dest) {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
}
gulp.task('fontdump', function(){
  dumper('assets/fonts/**/*', '../'+buildDir+'/assets/fonts');
});

gulp.task('wpdump', function(){
  dumper(['style.css', 'screenshot.png'], '../'+buildDir);
});

gulp.task('watch', function() {
    gulp.watch(['js/**/*.js', 'todo/scripts/*.js'], ['js']);
    gulp.watch(['sass/**/*'], ['sass']);
    gulp.watch('assets/fonts/**/*', ['fontdump']);
    gulp.watch(['**/*.php', '**/*.html', '!dashview/components/*.html', 'plugin-*.js'], ['templatecrush']);
    gulp.watch(['style.css', 'screenshot.png'], ['wpdump']);
    gulp.watch(['todo/assets/**/*'], ['todoassets']);
    gulp.watch(['dashview/components/*.html'], ['vue-components']);
});

gulp.task('build', ['wpdump','templatecrush','fontdump','js','sass', 'vue-components']);
