const path = require("path")
const webpack =  require('webpack')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const cleanWebpackPlugin =require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const PATHS = {
    libsPath: path.resolve(process.cwd(), './libs'),
}
module.exports={
	entry:{
        index:__dirname + "/src/main.js",
    },
	output:{
		path:path.resolve(__dirname+"/dist"),
		filename:"[name]-[hash].js"
	},
    module: {//loader定义的地方，使用前需要npm 安装
        rules: [
            {
                test:/(\.html)$/,
                use:{
                    loader:"html-loader",
                },
            },
			{//处理es6语法，和jsx语法
                test:/(\.jsx|\.js)$/,
                use:{
                    loader:"babel-loader",
                },
                exclude:/node_modules/
			},{
                test: /\.(png|gif|jpe?g)$/,
                loader: 'url-loader',
                query: {
                    /*
                     *  limit=10000 ： 10kb
                     *  图片大小小于10kb 采用内联的形式，否则输出图片
                     * */
                    limit: 10000,
                    name: '/img/[name]-[hash:8].[ext]'
                }
            },{
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback:"style-loader",
                    use:[ 'css-loader']
                })
            },
            {
                test: /\.less$/i,
                use: extractLESS.extract({
                    fallback:"style-loader",
                    use:[ 'css-loader', 'less-loader']
                })
            },
		]
    },
    plugins:[
        /*
         *create html file
         * （创建html文件）
         * */
		new HtmlWebpackPlugin({
			template:__dirname+"/src/index.tmpl.html"
		}),
        new HtmlWebpackPlugin({
            filename: 'html/tmpl.html',
            template: __dirname + '/src/tmpl.html',
            inject: false,
        }),
        /*
         *  Module (value) is loaded when the identifier (key) is used as free variable in a module
         *  （如：使用jquery 可以直接使用符号 "$"）
         * */
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "underscore"
        }),
        /*
        *热加载插件,如果配合react使用，
        *需要安装babel-plugin-react-transform react-transform-hmr配合babel
        * */
        new webpack.HotModuleReplacementPlugin(),
        /*
        *清除打包文件夹中多余的js文件
        * */
        new cleanWebpackPlugin(['dist']),
        extractCSS,
        extractLESS,
        /*
        * CommonsChunkPlugin（防止重复）
        * */
        new webpack.optimize.CommonsChunkPlugin({
            name:'common'//指定公共的bundle的名称
        })
	],
    resolve: {
        /*
        * An array of extensions that should be used to resolve modules
        * （引用时可以忽略后缀）
        * */
        extensions: ['.js', '.css', '.scss','.less','.ejs', '.png', '.jpg','.html'],
        alias: {
            /*
             * js
             */
            jquery: path.join(PATHS.libsPath, "js/jquery"),
            /*
             * css
             */
            bootstrapcss: path.join(PATHS.libsPath, "bootstrap/bootstrap-3.3.5.css"),
        }
    }
}