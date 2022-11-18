let jsste = require("./index");
let myargs = process.argv.slice(2);
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

addCommand({prefix:"-log"},(arg) =>{
    jsste.setStateFunction((state) =>{
        console.log(state);
    })
})

addCommand({prefix:"-Jsconfig="},(arg) =>{
    jsste.__config.setConfig(arg);
})

addCommand({prefix:"-page="},(arg) =>{
    pagefile = JSON.parse(fs.readFileSync(arg,"utf-8").toString())
})

addCommand({prefix:"-temp="},(arg) =>{
    tempfile  = fs.readFileSync(arg, "utf-8").toString()
})

output = jsste.render(pagefile || undefined, tempfile || undefined)

addCommand({prefix:"-out"},(arg) =>{
    console.log(output)
})
