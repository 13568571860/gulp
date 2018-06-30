const gulp = require("gulp");
const scss = require("gulp-sass");
const css = require("gulp-clean-css");
const html = require("gulp-htmlmin");
const connect = require("gulp-connect");
const babel = require('gulp-babel');
const change = require("gulp-changed");
const debug = require('gulp-debug');
const opti = require("gulp-requirejs-optimize");
const less = require('gulp-less');
//指定项目改变时需要刷新的页面
const src = "./**/*.html";
//指定项目js目录
const lojs = "./src/js/*.js";
// 指定项目js打包目录
const tojs = "./dist/js";
//指定项目css目录
const locss = "./src/css/*.css";
// 指定项目css打包目录
const tocss = "./dist/css";
//指定项目scss目录
const loscss = "./src/css/*.scss";
// 指定项目scss打包目录
const toscss = "./dist/css";
//指定项目sass目录
const losass = "./src/css/*.sass";
// 指定项目sass打包目录
const tosass = "./dist/css";
//指定项目less目录
const loless = "./src/css/*.less";
// 指定项目sass打包目录
const toless = "./dist/css";
// 指定项目html目录
const lohtml = "./src/html/*.html";
// 指定项目html打包目录
const tohtml = "./dist/html";



//开启静态服务器
gulp.task("server", function(){
	connect.server({
		root: "",
		port: 82,
		livereload: true
	})
})


//监听项目目录下所有的文件改动并通知对应的处理程序
gulp.task("auto", function(){
	gulp.watch("./src/**", ["reload"]);
	// 监听项目所有html文件改动通知htmlmin重新打包文件
	gulp.watch(lohtml, ["htmlmin"]);
	// 监听项目所有index.html文件改动通知index重新打包文件
	gulp.watch("./src/index.html", ["index"]);
	//监听项目所有css文件改动通知cssmin重新打包文件
	gulp.watch(locss, ["cssmin"]);
	//监听项目所有scss文件改动通知scssmin重新打包文件
	gulp.watch(loscss, ["scssmin"]);
	//监听项目所有sass文件改动通知scssmin重新打包文件
	gulp.watch(losass, ["sassmin"]);
	//监听项目所有less文件改动通知scssmin重新打包文件
	gulp.watch(loless, ["lessmin"]);
	//监听项目所有js文件改动通知cssmin重新打包文件
	gulp.watch(lojs, ["jsmin"]);
})


gulp.task("autoJs", function(){
	
})
// 收到来自auto的事件通知后执行回调函数
gulp.task("reload", function(){
	console.log("检测到文件改变,已刷新网页");
	gulp.src(src).pipe(connect.reload());
})


// 收到来自autoHtml的事件通知后执行回调函数
gulp.task("htmlmin", function(){
	console.log("html文件改变,正在打包压缩");
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
	gulp.src(lohtml)
	.pipe(change(tocss))
	.pipe(debug({title: '编译:'}))
	.pipe(html(options))//压缩html文件
	.pipe(gulp.dest(tohtml))//输出到指定目录
	.pipe(debug({title: 'html文件更改完成打包压缩完毕,已输出到指定目录:'}))
})



gulp.task("index", function(){
	console.log("index.html文件改变,正在打包压缩");
	var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
	gulp.src("./src/*.html")
	.pipe(change(tocss))
	.pipe(debug({title: '编译:'}))
	.pipe(html(options))//压缩html文件
	.pipe(gulp.dest("./dist"))//输出到指定目录
	.pipe(debug({title: 'index.html文件更改完成打包压缩完毕,已输出到指定目录:'}))
})




// 收到来自autoCss的事件通知后执行回调函数
gulp.task("cssmin", function(){
	console.log("css文件改变,正在打包压缩");
	gulp.src(locss)
	.pipe(change(tocss))
	.pipe(debug({title: '编译:'}))
	.pipe(css())
	.pipe(gulp.dest(tocss))
	.pipe(debug({title: 'css文件更改完成打包压缩完毕,已输出到指定目录:'}))
})



// 收到来自autoCss的事件通知后执行回调函数
gulp.task("scssmin", function(){
	var oriStr = loscss.split("/");
	var len = oriStr.length;
	oriStr = oriStr.slice(0, len - 1).join("/");
	console.log("scss文件改变,正在打包压缩");
	gulp.src(loscss)
	.pipe(change(toscss))
	.pipe(debug({title: '编译:'}))
	.pipe(scss())
	.pipe(gulp.dest(oriStr))
	.pipe(css())
	.pipe(gulp.dest(toscss))
	.pipe(debug({title: 'scss文件更改完成打包压缩完毕,已输出到指定目录:'}))
})



// 收到来自autoCss的事件通知后执行回调函数
gulp.task("sassmin", function(){
	var oriStr = losass.split("/");
	var len = oriStr.length;
	oriStr = oriStr.slice(0, len - 1).join("/");
	console.log("scss文件改变,正在打包压缩");
	gulp.src(losass)
	.pipe(change(tosass))
	.pipe(debug({title: '编译:'}))
	.pipe(scss())
	.pipe(gulp.dest(oriStr))
	.pipe(css())
	.pipe(gulp.dest(tosass))
	.pipe(debug({title: 'sass文件更改完成打包压缩完毕,已输出到指定目录:'}))
})


// 收到来自autoCss的事件通知后执行回调函数
gulp.task("lessmin", function(){
	var oriStr = loless.split("/");
	var len = oriStr.length;
	oriStr = oriStr.slice(0, len - 1).join("/");
	console.log("less文件改变,正在打包压缩");
	gulp.src(loless)
	.pipe(change(toless))
	.pipe(debug({title: '编译:'}))
	.pipe(less())
	.pipe(gulp.dest(oriStr))
	.pipe(css())
	.pipe(gulp.dest(toless))
	.pipe(debug({title: 'less文件更改完成打包压缩完毕,已输出到指定目录:'}))
})



gulp.task('jsmin', function() {
	console.log("css文件改变,正在打包压缩");
	gulp.src(lojs)
	.pipe(change(tojs))
	.pipe(debug({title: '编译:'}))
	.pipe(babel())
	.pipe(opti())
    .pipe(gulp.dest(tojs))
    .pipe(debug({title: 'js文件更改完成打包压缩完毕,已输出到指定目录:'}))
});



gulp.task("default", ["server", "auto"]);



