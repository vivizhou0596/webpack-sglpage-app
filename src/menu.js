//let indexImg = require('./img/index')
let tmplHtml = require("./tmpl")

module.exports=function(){
    let menu =  document.createElement("div")
    menu.textContent = "this is a menu"
    $(menu).html(tmplHtml)
    return menu
}