@echo off
title ***药品终端网项目创建***
echo 目录创建中...
mkdir %cd%\dev %cd%\dev\libs %cd%\dev\html %cd%\dev\demo %cd%\dev\images %cd%\dev\images\base %cd%\dev\images\files %cd%\dev\js %cd%\dev\js\mocks %cd%\dev\js\lib %cd%\dev\sass %cd%\dev\css %cd%\dist %cd%\dist\html %cd%\dist\css %cd%\dist\images %cd%\dist\js %cd%\dist\libs %cd%\dist
echo -------------------------------------------------- 
echo -------------------------------------------------- 
echo 目录创建完成！
echo -------------------------------------------------- 
echo -------------------------------------------------- 
echo gulp、gulp组件及第三方库开始创建...
echo --------------------------------------------------  
echo -------------------------------------------------- 
echo 创建git过滤文件！
echo -------------------------------------------------- 
echo -------------------------------------------------- 
echo /node_modules/ > .gitignore
npm install
echo --------------------------------------------------  
echo --------------------------------------------------
echo 基础组件配置
echo --------------------------------------------------  
echo --------------------------------------------------
gulp pre
echo 项目创建完成！药品终端网!
pause