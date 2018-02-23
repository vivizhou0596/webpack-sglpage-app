const express = require('express');
const app = express();
app.get('/data',function(req,res){
	//User.findOne({user:'xiaoming'},function(err,doc){
	res.json({"name":"xiaoming","age":18})
	//})
})
app.listen(9091,function(){
	console.log('Node app start at port 9093')
})
