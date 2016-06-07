
"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    clean = require("gulp-clean"),
    uglify = require("gulp-uglify"),
    gulpif = require("gulp-if"),
    concat = require("gulp-concat"),
    sourcemaps = require("gulp-sourcemaps"),
    livereload = require("gulp-livereload"),
    autoprefixer = require("gulp-autoprefixer"),

    yargs = require("yargs").argv,

    prod, js;



prod = yargs.prod;

js = {

    out: "./assets/dist/js",
    vendorout: "./assets/dist/js/vendor",
    modernizr: "./bower_components/modernizr/modernizr.js",

    vendor: [

        "./bower_components/svg4everybody/svg4everybody.ie8.js",
        "./bower_components/jquery/dist/jquery.js"

    ]

};










gulp.task("default", ["init", "watch"], function() {

    console.log("\n  💫  👌 \n");

});

gulp.task("init", ["assets", "js", "img", "sass"], function() {

    console.log("\n\n\n 🌟 getting this show on the road... \n");

});








gulp.task("assets", function() {

    var assets = [
            "./assets/app/favicon.png",
            "./assets/app/favicon.ico",
            "./assets/app/apple-touch-icon.png" ];

    gulp
        .src( assets )
        .pipe( gulp.dest("./assets/dist") );

});

gulp.task("js", ["clean:js"], function() {

    gulp.src( js.vendor )

        .pipe( gulpif( prod, uglify() ) )
        .pipe( gulp.dest( js.vendorout ) )

        .pipe( concat("vendor.js") )
        .pipe( gulp.dest( js.vendorout ) );


    gulp.src( js.modernizr )

        .pipe( gulpif( prod, uglify() ) )
        .pipe( gulp.dest( js.vendorout ) );


    gulp.src( "./assets/app/js/**/*.js" )

        .pipe( gulpif( prod, uglify() ) )
        .pipe( gulp.dest( js.out ) )

        .pipe( concat("combined.js") )
        .pipe( gulp.dest( js.out ) );

});

gulp.task("sass", ["clean:sass"], function() {

    var opts = {

        outputStyle: ( prod ) ? "compressed" : "expanded",
        sourceComments: !prod,

    };

    return gulp
        .src("./assets/app/css/**/*.scss")
        .pipe( sourcemaps.init() )
        .pipe( sass( opts ).on("error", sass.logError ) )
        .pipe( autoprefixer("last 5 versions") )
        .pipe( sourcemaps.write("../maps") )
        .pipe( gulp.dest("./assets/dist/css") )
        .pipe( livereload( 1337 ) );

});

gulp.task("img", ["clean:img"], function() {

    return gulp.src("./assets/app/img/**/*")
        .pipe( gulp.dest("./assets/dist/img") );

});


gulp.task("clean", function() {

    console.log("\n All clean! \n");

    return gulp
        .src("./assets/dist", { read: false })
        .pipe( clean() );

});

gulp.task("clean:js", function() {

    return gulp
        .src("./assets/dist/js", { read: false })
        .pipe( clean() );

});

gulp.task("clean:sass", function() {

    return gulp
        .src("./assets/dist/css", { read: false })
        .pipe( clean() );

});

gulp.task("clean:img", function() {

    return gulp
        .src("./assets/dist/img", { read: false })
        .pipe( clean() );

});










gulp.task("watch", function() {

    livereload.listen();
    gulp.watch("./assets/app/css/**/*.scss", [ "sass" ]);
    gulp.watch("./assets/app/js/**/*.js", [ "js" ]);

});
