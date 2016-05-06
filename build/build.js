({
	appDir: '../dev',
	baseUrl: 'js',
    paths : {
        //在里面设置baseurl不能达到的路径
        //rap : 'http://192.168.0.244/rap.plugin.js?projectId=3'
    },
    dir: "../dist",
    fileExclusionRegExp: /^(html|css|images|sass|demo)/,
 	optimizeCss: "none",
    optimize: "uglify",
    removeCombined: true,
    findNestedDependencies: true,
	modules: [  //压缩后出现的文件的设置
		{
			name : 'base'
		},

        {
            name:'index',
            exclude: [
                "base"
            ]
        }
    ]
})