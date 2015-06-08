gulp = require 'gulp'
coffee = require 'gulp-coffee'

watch = require 'gulp-watch'
livereload = require 'gulp-livereload'
concat = require 'gulp-concat'
compass = require 'gulp-compass'
minifyCSS = require 'gulp-minify-css'
notify = require 'gulp-notify'
uglify = require 'gulp-uglify'
plumber = require 'gulp-plumber'
sass = require 'gulp-ruby-sass'

paths =
  coffee: ["dev/coffee/*.coffee"]
  # js: ["js/*.js"]
  js: ["js/three.min.js",
    # "js/jquery.pjax.js",
    # "js/jquery.transit.js",
    # "js/jquery.marquee.min.js",
    # "js/mx.js",
    # "js/mx.rotationControl.js",
    "js/tween.min.js",
    "js/script.js"
    ],
  sass: ["dev/sass/*.sass"]
  css: ["dev/css/*.css"]
  images: "client/img/**/*"
  html: [
    "**/*.html"
    "**/*.php"
  ]
  less: ["**/style.less"]

gulp.task "compass", ->
  gulp.src(paths.sass)
  .pipe plumber(errorHandler: (error) ->
      console.log error.message
      @emit "end"
  )
  .pipe(compass(
    css: "./"
    sass: "dev/sass"
    image: "images"
    javascript: "dev/js"
    comments: false
    style: "compressed"
  )).on("error", (err) ->
  # .pipe(minifyCSS())
  # .pipe(gulp.dest("./"))
  # .pipe(livereload())
  )

# gulp.task "compass", ->
#   gulp.src(paths.sass)
#   # .pipe(plumber())
#   .pipe(compass(
#     css: "./"
#     sass: "dev/sass"
#     image: "images"
#     javascript: "js"
#     comments: false
#     style: "nested"
#   ))
#   .pipe(minifyCSS())
#   .pipe(gulp.dest("./"))
#   .pipe notify("gulp: compass finished.")

gulp.task "coffee", ->
  gulp.src(paths.coffee).pipe(plumber()).pipe(coffee()).pipe(gulp.dest("scripts")).pipe(livereload()).pipe notify("gulp: coffee finished.")

gulp.task "js", ->
  gulp.src(paths.js)
  .pipe(concat("all.js"))
  .pipe(uglify())
  .pipe(gulp.dest("js"))
  .pipe notify("gulp: js finished.")

gulp.task "css", ->
  gulp.src(paths.css)
  .pipe(concat("naotone.css"))
  .pipe(gulp.dest("dev/css"))
  .pipe(livereload())
  .pipe notify("gulp: css finished.")

gulp.task "html", ->
  reload_script = undefined
  reload_script = "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>')</script>"
  gulp.src("./*.html").pipe(header(reload_script, {})).pipe gulp.dest("./")


#///////////////////////////////////////////////////////////////
gulp.task "default", ->
  gulp.run "compass", "coffee", "js"

gulp.task "release", ->
  gulp.src("style.css").pipe(minifyCSS()).pipe gulp.dest("./")
  gulp.src("js/all.js").pipe(uglify()).pipe gulp.dest("js")

gulp.task "watch", ->
  gulp.watch paths.sass, ["compass"]
  # gulp.watch(paths.css, ['css']);
  # gulp.watch(paths.less, ['less']);
  gulp.watch paths.coffee, ["coffee"]
  gulp.watch paths.js, ["js"]
  gulp.watch paths.js, ["release"]

  # gulp.watch(paths.html, ['html']);
  server = livereload()
  gulp.watch([
    "css/*.css"
    "js/*.js"
    # "**/*.html"
    # "**/*.php"
  ]).on "change", (file) ->
    server.changed file.path


gulp.task "watch_min", ->
  gulp.watch paths.sass, ["compass"]

  # gulp.watch(paths.css, ['css']);
  # gulp.watch(paths.less, ['less']);
  gulp.watch paths.coffee, ["coffee"]
  gulp.watch paths.js, ["js"]
  gulp.watch paths.js, ["release"]

  # gulp.watch(paths.html, ['html']);
  server = livereload()
  gulp.watch([
    "css/*.css"
    "js/*.js"
    "**/*.html"
    "**/*.php"
  ]).on "change", (file) ->
    server.changed file.path
