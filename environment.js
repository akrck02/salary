const path = require("path");

// Redeclaring the Nodejs global variable object
global.root = path.resolve(__dirname + "/");

function main(environment = "development"){
    const fs = require("fs");

    if(update !== true){
        update = false;
    }

    // Read package.json
    const packageFile = fs.openSync(path.join(global.root,"package.json"), "r");
    const packageJsonFile = JSON.parse(fs.readFileSync(packageFile, "utf8"));
    fs.closeSync(packageFile);

    // update version
    if(update){
        versionJsonFile.VERSION = semver(versionJsonFile.VERSION, type, prefix);
    }
    
    // Change the environment
    if(env == "-d") {
        versionJsonFile.ENVIRONMENT = "development";
    } else {
        versionJsonFile.ENVIRONMENT = "production";
    }

    // open config.ts
    const configFile = fs.openSync(path.join(global.root,"client/src/config/config.ts"), "r");
    const configString = fs.readFileSync(configFile, "utf8");
    fs.closeSync(configFile);

    // update 
    let configStringUpdated = "";
    
    if(env == "-d") {
        configStringUpdated = configString.replaceAll("../#/", "index-dev.html#/");
    }
    else {
        configStringUpdated = configString.replaceAll("index-dev.html#/","../#/");
    }
    
    const configFileUpdated = fs.openSync("client/src/config/config.ts", "w");
    fs.writeFileSync(configFileUpdated, configStringUpdated, "utf8");
    fs.closeSync(configFileUpdated);

} 

const args = process.argv.slice(2);
main(args[0], args[1], args[2], args[3]);