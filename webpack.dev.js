const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const proxy = require('http-proxy-middleware');//引入代理中间件

const express = require('express');//引入express服务器
const app = express();//新建一个服务器

app.get('/data',function(req,res){//请求data接口响应消息
	res.json({"name":"xiaoming","age":18})
})
app.listen(3000)//监听3000端口

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase:"./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback:true,//不跳转
        inline:true,//实时刷新
        hot:true,//热加载
        open:true,//自动打开浏览器
        proxy: {//请求转发的代理设置
          '/': { // 表示当前项目请求的key,匹配根目录下的所有请求到http://localhost:3000
            target: 'http://localhost:3000', // 代理服务器路径
            pathRewrite: {'^/' : '/'}, // 重写路径
            changeOrigin: true
          }
        }
    }
});