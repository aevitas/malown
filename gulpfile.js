const gulp = require("gulp");
const ts = require("gulp-typescript");
const JSON_FILES = ["src/*.json", "src/**/*.json"];

const project = ts.createProject("tsconfig.json");

gulp.task("scripts", () => {
  const result = project.src().pipe(project());
  return result.js.pipe(gulp.dest("dist"));
});

gulp.task("watch", ["scripts"], () => {
  gulp.watch("src/**/*.ts", ["scripts"]);
});

gulp.task("assets", function() {
  return gulp.src(JSON_FILES).pipe(gulp.dest("dist"));
});

gulp.task("default", ["watch", "assets"]);
