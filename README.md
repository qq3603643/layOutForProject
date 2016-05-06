![](https://static2.ypzdw.com/shop/images/base/logo_small.png)

前端-药品终端网
----------
*药品终端网-前端：*
> *安装使用：*<br/>
> *1、首次安装运行 install.bat 文件（如node组件有缺失请多次运行install.bat）*<br/>
> *2、生产环境发布运行 build.bat（专人维护运行此文件，请勿乱使用！）*<br/>
> *3、开发环境请运行在项目跟目录运行node 命令:gulp watch（监听编译SASS）*<br/>

 1.注意事项：<br/>
`后端开发人员只需clone dist文件夹、并无权限上传。`

> 项目目录结构<br/>
├─build	配置文件目录<br/>
│  ├─config.json<br/>
├─dev	开发环境<br/>
│  ├─html	html<br/>
│  ├─images<br/>
│  │  ├─base	项目UI图标<br/>
│  │  └─files	测试示例图片<br/>
│  ├─js<br/>
│  │  ├─lib	第三方库和插件<br/>
│  │  └─mocks	本地模拟数据<br/>
│  ├─libs	第三方库<br/>
│  ├─sass	scss文件<br/>
│  └─css	编译完成的css文件<br/>
├─dist	生产环境<br/>
│  ├─html	html<br/>
│  ├─images<br/>
│  │  ├─base	项目UI图标<br/>
│  │  └─files	测试示例图片<br/>
│  ├─js<br/>
│  │  ├─lib	第三方库和插件<br/>
│  │  └─mocks	本地模拟数据<br/>
│  ├─libs	第三方库<br/>
│  └─css	编译完成的css文件<br/>
├─test<br/>
├─gulpfile.js	gulp配置文件<br/>
├─package.json	node配置文件<br/>
├─install.bat	项目安装文件<br/>
└─build.bat	发布生产环境<br/>

*药品终端网-RAP(接口文档管理、MOCK)：*
-----------
> *RAP地址：http://192.168.0.244<br/>
> *MOCK DEMO 地址： http://192.168.0.244/demo/rap_test <br/>

*药品终端网-DEMO(前端)：*
-----------
> *前端DEMO地址：http://192.168.0.244<br/>