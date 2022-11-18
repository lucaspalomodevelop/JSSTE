let jsste = require("./index");
let myargs = process.argv.slice(2);
let output = "";
let pagefile, tempfile;
let path = require("path");
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

addCommand({prefix:"-pageFile="},(arg) =>{
    pagefile = JSON.parse(fs.readFileSync(arg, "utf8"));
    pagefile["_SELFPATH_"] = path.dirname(arg);
})
addCommand({prefix:"-page="},(arg) =>{

    pagefile = JSON.parse(arg);
    pagefile["_SELFPATH_"] = path.dirname(arg);
})

addCommand({prefix:"-tempFile="},(arg) =>{
    tempfile  = fs.readFileSync(arg, "utf8");
})

addCommand({prefix:"-temp="},(arg) =>{
    tempfile  = arg
})

output = jsste.render(pagefile || undefined, tempfile || undefined)

addCommand({prefix:"-info"},(arg) =>{

    if(arg == "?json")
    {
        console.log(JSON.stringify(jsste.info))
    }
    else{
        Object.keys(jsste.info).forEach((key)=>{
            console.log(key + " : " + jsste.info[key] )
        })
    }
})




addCommand({prefix:"-out"},(arg) =>{
    console.log(output)
})
