const gulp = require( "gulp" );
const babel = require( "gulp-babel" );

gulp.task( "build-api", () => {
    return gulp.src( "../src/api/**/*.js" )
        .pipe( babel( {
            presets: [ "es2015" ]
        } ) )
        .pipe( gulp.dest( "../dist/api"))
} );

gulp.task( "build-server", () => {
    return gulp.src( "../src/server/**/*.js" )
        .pipe( babel( {
            presets: [ "es2015" ]
        } ) )
        .pipe( gulp.dest( "../dist/server"))
} );

gulp.task( "default", [ "build-api", "build-server" ] );