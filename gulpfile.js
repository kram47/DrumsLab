/* ------------------------------------------------ */
/* --- Dependencies --- */
/* ------------------------------------------------ */

var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var jsdoc = require('gulp-jsdoc3');


/* ------------------------------------------------ */
/* --- Tasks --- */
/* ------------------------------------------------ */


//  G E N E R A L

    // Default task
    gulp.task('default', ['babel'], function() {
        console.log("Developper les taches gulp");
    });

    // Watch the JS Files
    gulp.task('watch', function() {
        return gulp
            .watch("src/js/**/*", ["babel"])
            ;
    });



//  D O C U M E N T A T I O N

    // Generate JS Documentation
    gulp.task('doc', ['doc.clean'], function(cb) {
        var config = require('./jsdoc.json');

        gulp.src(['README.md', './src/js/**'], {read: false})
            .pipe(jsdoc(config, cb))
            ;
    });

    // Remove JS Documentation folder
    gulp.task('doc.clean', function() {
        return gulp
            .src('./documentation/*')
            .pipe(clean())
            ;
    });



//  J S   T R A N S P I L A T I O N

    // Remove compiled js folder
    gulp.task('babel.clean', function() {
        return gulp
            .src('src/compiled_js/*')
            .pipe(clean())
            ;
    });

    // Transpile js files
    gulp.task('babel', ['babel.clean'], function() {
        return gulp
            .src('src/js/**/*.js')
            .pipe(babel({
                presets : ["latest"]
            }))
            .pipe(gulp.dest("src/compiled_js"))
            ;
    });


