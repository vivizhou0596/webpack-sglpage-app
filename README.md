# webpack单页应用爬坑记录

 webpack 单页应用

###一个webpack的入门配置
学习完[入门Webpack，看这篇就够了](https://www.jianshu.com/p/42e11515c10f)教程后，自己参照官方文档配置了一个单页应用，可以直接clone下来使用
###安装命令
hash
```
# 安装依赖
npm intall
# 前端热加载 localhost:8080
npm run server
# 分离开发与上线模式，压缩打包
npm run build

```
```
2018-2-23 更新http-proxy-middleware设置
更新文件webpack.dev.js
前端运行接口localhost:8080
express创建服务器运行端口为localhost:3000
配置的目的是同时启动两个服务，并将前端的请求转发到后台服务器（localhost:3000）
1、中间件配置
//引入代理中间件
const proxy = require('http-proxy-middleware');
//webpack相关配置
devServer: {
        ...此处省略一万字
        proxy: {//请求转发的代理设置
          '/': { // 表示当前项目请求的key,匹配根目录下的所有请求到http://localhost:3000
            target: 'http://localhost:3000', // 代理服务器路径
            pathRewrite: {'^/' : '/'}, // 重写路径
            changeOrigin: true
          }
        }
    }
2、express服务器设置
const express = require('express');//引入express服务器
const app = express();//新建一个服务器

app.get('/data',function(req,res){//请求data接口响应消息
	res.json({"name":"xiaoming","age":18})
})
app.listen(3000)//监听3000端口
这里进行了最简易的配置，实现了核心逻辑，可以一次为基础进行扩展

```


配置过程总结详见我的博客[唯雪的博客]http://www.cocostory.cn/index.php/Home/Index/article/aid/35

有兴趣的朋友可以clone下来，参照这两篇文章自行配置，还是老规矩记得star哦