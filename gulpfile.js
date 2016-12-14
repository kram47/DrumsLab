var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');

gulp.task('default', ['babel'], function() {
    console.log("Developper les taches gulp");
});


/* ------------------------------------------------ */
//  J S   T R A N S P I L A T I O N
/* ------------------------------------------------ */

// Remove compiled js folder
gulp.task('babel.clean', function() {
    return gulp
        .src('src/compiled_js/*')
        .pipe(clean());
});

// Transpile js files
gulp.task('babel', ['babel.clean'], function() {
    return gulp
        .src('src/js/**/*.js')
        .pipe(babel({
            presets : ["latest"]
        }))
        .pipe(gulp.dest("src/compiled_js"));
});


