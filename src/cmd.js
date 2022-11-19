let jsste = require("./index");
let myargs = process.argv.slice(2);
let output = "";
let pagefile, tempfile;
let path = require("path");
let fs = require("fs");

/**
 *  this function filters the prefix and call the callback with the param
 * @param {prefix, args } settings 
 * @param {*} callback 
 */
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

/**
 * -log | show jsste log
 */
addCommand({prefix:"-log"},(arg) =>{
    jsste.setStateFunction((state) =>{
        console.log(state);
    })
})

/**
 * -Jsconfig | set jsste config as json
 */
addCommand({prefix:"-Jsconfig="},(arg) =>{
    jsste.__config.setConfig(arg);
})

/**
 * -pageFile | set pageFile path
 */
addCommand({prefix:"-pageFile="},(arg) =>{
    pagefile = JSON.parse(fs.readFileSync(arg, "utf8"));
    pagefile["_SELFPATH_"] = path.dirname(arg);
})

/**
 * -pageFile | set pageFile as json
 */
addCommand({prefix:"-page="},(arg) =>{

    pagefile = JSON.parse(arg);
    pagefile["_SELFPATH_"] = path.dirname(arg);
})

/**
 * -tempFile | set tempFile path
 */
addCommand({prefix:"-tempFile="},(arg) =>{
    tempfile  = fs.readFileSync(arg, "utf8");
})

/**
 * -pageFile | set pageFile as code
 */
addCommand({prefix:"-temp="},(arg) =>{
    tempfile  = arg
})

/**
 * rendering
 */
output = jsste.render(pagefile || undefined, tempfile || undefined)

/**
 * -info | show jsste.info
 */
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

/**
 * -out | write rendered code into the commandling
 */
addCommand({prefix:"-out"},(arg) =>{
    console.log(output)
})
