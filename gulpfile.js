const gulp = require('gulp');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const watch = require('gulp-watch');
const file = require('gulp-file');

const index = `
// ssr collector
exports.head = require('./client/ssr/head');
exports.headParams = require('./client/ssr/headParams');
exports.reactRouterRedux = require('./client/ssr/reactRouterRedux');
exports.reactRouterReduxIntl = require('./client/ssr/reactRouterReduxIntl');
exports.reactRedux = require('./client/ssr/reactRedux');
exports.route = require('./client/ssr/route');
exports.routeParams = require('./client/ssr/routeParams');
exports.preloadedState = require('./client/ssr/preloadedState');
exports.wrapDOM = require('./client/ssr/wrapDOM');
exports.wrapSSR = require('./client/ssr/wrapSSR');
exports.ssr = require('./client/ssr/ssr');

exports.ssrHook = require('./shared/ssrHook');
`;

const argv = require('yargs').argv;
const path = require('path');

gulp.task('build', ['index'], () => {
  gulp.src(['server/*', 'server/**/*'])
    .pipe(babel())
    .pipe(gulp.dest('lib/server'));
  gulp.src('bin/*')
    .pipe(babel())
    .pipe(gulp.dest('lib/bin'));
  gulp.src(['client/*.js', 'client/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib/client'));
  gulp.src('shared/*')
    .pipe(babel())
    .pipe(gulp.dest('lib/shared'));
});

gulp.task('build:watch', ['index'], () => {
  gulp.src(['server/*', 'server/**/*'])
    .pipe(watch(['server/*', 'server/**/*']))
    .pipe(babel())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('lib/server'));
  gulp.src('bin/*')
    .pipe(watch('bin/*'))
    .pipe(babel())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('lib/bin'));
  gulp.src(['client/*.js', 'client/**/*.js'])
    .pipe(watch(['client/*.js', 'client/**/*.js']))
    .pipe(babel())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('lib/client'));
  gulp.src('shared/*')
    .pipe(watch('shared/*'))
    .pipe(babel())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('lib/shared'));
});

gulp.task('index', () => {
  file('index.js', index)
    .pipe(gulp.dest('lib'));
  })
