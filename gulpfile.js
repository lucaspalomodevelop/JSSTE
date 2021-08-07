const gulp = require('gulp'); 
const minify = require('gulp-minify');

gulp.task('build', function(done) {
    var Src = './src/*js',
    Dst = 'dist';
    gulp.src(Src)
    .pipe(minify({
        ext:{

            min:'.js'
        },
        noSource: true,
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(Dst))
    done();

});
