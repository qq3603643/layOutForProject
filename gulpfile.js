/**
 * 组件安装
 * "gulp": "3.9.0",
    "gulp-load-plugins": "1.2.0",
    "gulp-imagemin": "2.4.0",
    "gulp-changed": "1.3.0",
    "gulp-if": "2.0.0",
    "gulp-jshint": "2.0.0",
    "gulp-sass": "2.1.1",
    "gulp-minify-html": "1.0.5",
    "gulp-rev": "6.0.1",
    "gulp-concat": "2.6.0",
    "gulp-rename": "1.2.2",
    "gulp-uglify": "1.5.1",
    "gulp-useref": "3.0.4",
    "gulp-clean": "0.3.1",
    "gulp-notify": "2.2.0",
    "browser-sync": "2.11.1"
 */

// 引入 gulp及组件
var gulp    	= require('gulp'),                 	//gulp
	plugins 	= require('gulp-load-plugins')(),		//自动加载plugins
	config		= require('./build/config.json'),      //配置文件
	browserSync = require('browser-sync')

	/**
		*plugins.imagemin    图片压缩
		*plugins.changed     监听改变
		*plugins.if   		 判断
		*plugins.jshint      JS格式验证
		*plugins.sass        sass样式预处理
		*plugins.minifyHtml  html压缩
		*plugins.rev         MD5版本号
		*plugins.concat      文件合并
		*plugins.rename      重命名
		*plugins.uglify	     混淆JS
		*plugins.useref      修改替换HTML
		*plugins.clean       清除文件
		*plugins.notify      控制台文字描述
		*plugins.browserSync 实时自动刷新
	*/	

// HTML处理
gulp.task('html', function() {
    gulp.src(config.htmlFiles.src)
    	.pipe(plugins.changed(config.htmlFiles.dest))
    	.pipe(plugins.useref())
        .pipe(gulp.dest(config.htmlFiles.dest));
    console.log('\n==========html处理完成！==========\n');
});

// 样式处理
gulp.task('css', function () {
    gulp.src(config.cssFiles.src)
    	.pipe(plugins.changed(config.cssFiles.dest))
    	.pipe(plugins.sass({ outputStyle: 'expanded'}))
    	.on('error', function(e){console.log(e)})
    	.pipe(gulp.dest(config.cssFiles.dest2))
        .pipe(plugins.sass({ outputStyle: 'compressed'}))
        .pipe(gulp.dest(config.cssFiles.dest));
    //字体
    console.log('\n==========字体处理==========\n');
    gulp.src("dev/css/font/*")
        .pipe(gulp.dest("dist/css/font/"));
    console.log('\n==========CSS处理完成！==========\n');
});

// 图片处理
gulp.task('images', function(){
    gulp.src(config.imageFiles.src)
    	.pipe(plugins.changed(config.imageFiles.dest))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(config.imageFiles.dest));
    console.log('\n==========images处理完成！==========\n');    
})

//js处理
gulp.task('js', function () {
    //gulp.src(config.jsFiles.src)
        //.pipe(gulp.dest(config.jsFiles.dest))
    // gulp.src(config.jsFiles.src)
    // .pipe(amdOptimize("main", { 
    //     //require config  
    //     paths: {  
    //         "jquery": "../../libs/jquery/dist/jquery.min"
    //     },  
    //     shim: {  
    //         "jquery.serializeJSON": ['jquery']  
    //     }  
    // }))  
    // .pipe(concat("index.js"))           //合并  
    // .pipe(gulp.dest("dist/js"))          //输出保存  
    // .pipe(rename("index.min.js"))          //重命名  
    // .pipe(uglify())                        //压缩  
    // .pipe(gulp.dest("dist/js"));
});
//第三方
gulp.task('libs', function () {
    gulp.src(config.libFiles.src)
    	//.pipe(plugins.changed(config.libFiles.dest))
        .pipe(gulp.dest(config.libFiles.dest));        
    // //Jqure
    // gulp.src(config.libFilesJquery.src)
    // 	.pipe(plugins.changed(config.libFiles.dest))
   	// 	.pipe(gulp.dest(config.libFilesJquery.dest));
   	// //require	
   	// gulp.src(config.libFilesReruirejs.src)
   	// 	.pipe(plugins.changed(config.libFiles.dest))
   	// 	.pipe(gulp.dest(config.libFilesReruirejs.dest));
   	console.log('\n==========libs处理完成！==========\n');
});

// 清空图片、样式、js
gulp.task('clean', function() {
    return gulp.src([config.htmlFiles.dest, config.cssFiles.dest, config.imageFiles.dest], {read: false})
        .pipe(plugins.clean());
    console.log('\n==========清空HTML 图片、样式！==========\n');
});

// 默认任务 清空图片、样式、js并重建 运行语句 gulp
gulp.task('default', ['clean'], function(){
	console.log('\n==========布置生产环境处理中==========\n');
    gulp.start('html', 'css', 'images', 'libs');
    console.log('\n==========布置生产环境处理完成！==========\n');

});

//开发环境自动刷新
gulp.task('reload', function(){
	browserSync({
	    server: {
	        baseDir: "dev/",
            index: "html/index.html"
	      },
	      port: 9999,
	      files: [
	        config.htmlFiles.src[0],
	        config.cssFiles.src[0],
	        config.imageFiles.src[0],
	        config.jsFiles.src[0]
	      ]
  })
});

//生产环境自动刷新
gulp.task('dist', function(){
    browserSync({
        server: {
            baseDir: "dist/",
            index: "html/index.html"
          },
          port: 8888,
          files: [
            config.htmlFiles.src[0],
            config.cssFiles.src[0],
            config.imageFiles.src[0],
            config.jsFiles.src[0]
          ]
  })
});


// 监听任务 运行语句 gulp watch
gulp.task('watch', ['reload'], function(){

    // 监听html
    //gulp.watch(config.htmlFiles.src, function(event){
       // gulp.run('html');
    //})

    // 监听css
    gulp.watch(config.cssFiles.src, function(){
        gulp.run('css');
    });

    // 监听images
    //gulp.watch(config.imageFiles.src, function(){
        //gulp.run('images');
    //});

    // 监听js
    //gulp.watch(config.jsFiles.src, function(){
        //gulp.run('js');
    //});
    // 监听lib
    //gulp.watch(config.libFiles.src, function(){
        //gulp.run('lib');
    //});
});

//install前置task
gulp.task('pre', function(){    
    //Jqure
    gulp.src(config.libFilesJqueryDev.src)
   		.pipe(gulp.dest(config.libFilesJqueryDev.dest));
   	//require	
   	gulp.src(config.libFilesReruirejsDev.src)
   		.pipe(gulp.dest(config.libFilesReruirejsDev.dest));
});
