let jsste = require("./index");
let myargs = process.argv.slice(2);
let path = require("path");
const { fstat } = require("fs");
let output = "";
let pagefile, tempfile;
let fs = require("fs");

let addCommand = ({prefix,args = myargs}, callback) =>
{
    myargs.forEach((elem) =>{
        if(elem.startsWith(prefix))
        {
            elem = elem.replace(prefix,"")
            callback(elem);
        }
    })
}

addCommand({prefix:"-Jsconfig="},(arg) =>{
    jsste.__config.setConfig(arg);
})

addCommand({prefix:"-page="},(arg) =>{
    
    pagefile = JSON.parse(fs.readFileSync(arg,"utf-8").toString())
    console.log(pagefile)
})

addCommand({prefix:"-temp="},(arg) =>{
    tempfile  = fs.readFileSync(arg, "utf-8").toString()
    console.log(tempfile)
})

output = jsste.render(pagefile || undefined, tempfile || undefined)

addCommand({prefix:"-out"},(arg) =>{
    console.log("output\n", output )
})
