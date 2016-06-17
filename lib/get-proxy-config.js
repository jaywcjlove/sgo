var fs = require('fs');
var path = require('path');
var existsSync = fs.existsSync;

module.exports = function(configPath){
    var pathconf = path.join(process.cwd(),configPath),cache = null;
    if(existsSync(pathconf)){
        console.log(`\n  load rule from ${configPath}`);
    }
    try {
        cache = require(pathconf);
    } catch (e) {
        console.log(`${configPath} parse error`);
    }
    return cache
}