var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', ['babel'], function() {
    console.log("Developper les taches gulp");
});

// Transpile js files
gulp.task('babel', function() {
    return gulp.src('src/js/**/*.js')
               .pipe(babel({
                    presets : ["latest"]
                }))
               .pipe(gulp.dest("src/compiled_js"));
});
