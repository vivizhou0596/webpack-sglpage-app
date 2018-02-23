//let indexImg = require('./img/index')
let tmplHtml = require("./tmpl")
import axios from "axios"
axios.get('/data').then((res)=>{
	console.log(res)
}).catch((err)=>{
	console.log(err)
})

module.exports=function(){
    let menu =  document.createElement("div")
    menu.textContent = "my name is"
    $(menu).html(tmplHtml)
    return menu
}