var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    net = require("net"),
    ctype = require("./lib/content-type"),
    color = require('colors-cli'),
    catalog = require('./lib/catalog'),
    __port = 1987,
    cors = false,
    server;
    require('colors-cli/toxic');

module.exports = server;

connListener = function(request, response) {
    var uri = url.parse(request.url).pathname, 
        filename = path.join(process.cwd(), uri),
        _header = !cors ? {

        }:{
            "Access-Control-Allow-Origin":"*",
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers':'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, x-csrf-token, origin'
        };

    var ext = path.parse(request.url.replace(/\?.*$/g, "")).ext.replace('.','');
    if(ext) _header['Content-Type'] = ctype.getContentType(ext);

    // url 解码
    filename = decodeURIComponent(filename);

    var html = catalog(process.cwd()+request.url);

    if( fs.existsSync(filename) && fs.statSync(filename).isDirectory() && fs.existsSync(filename + '/index.html') ) filename += '/index.html';
    if( fs.existsSync(filename) && fs.statSync(filename).isFile() ){
        
        fs.readFile(filename, "binary", function(err, file) {
            response.writeHead(200,_header);
            response.write(file, "binary");
            response.end();
            commandLog(200,request,response)
            return;
        });

    }else{
        response.writeHead(404, {});
        response.write(html);
        response.end();
        commandLog(404,request,response)
        return;

    }

}
// 命令行颜色显示
function commandLog(staus,request,response){
    var code = response.statusCode;
    if(code === 200){
        console.log( 'INFO '.green_bt +  code.toString().green_bt + ' ' + request.url )
    }else{
        console.log( 'INFO '.red_bt +  code.toString().red_bt + ' ' + request.url );
    }
}

// 检测port是否存在
function probe(port, callback) {

    var server = net.createServer().listen(port)

    var calledOnce = false

    var timeoutRef = setTimeout(function () {
        calledOnce = true
        callback(false,port)
    }, 2000)

    timeoutRef.unref()

    var connected = false

    server.on('listening', function() {
        clearTimeout(timeoutRef)

        if (server)
            server.close()

        if (!calledOnce) {
            calledOnce = true
            callback(true,port)
        }
    })

    server.on('error', function(err) {
        clearTimeout(timeoutRef)

        var result = true
        if (err.code === 'EADDRINUSE')
            result = false

        if (!calledOnce) {
            calledOnce = true
            callback(result,port)
        }
    })
}

// 启动服务
function serverStart(_port){

    probe(_port,function(bl,_pt){
        if(bl === true){
            // ssr(_pt)
            server = http.createServer(connListener);
            server = server.listen(parseInt(_pt, 10));
            console.log("\n  Static file server running at" + color.green("\n\n=> http://localhost:" + _pt ) + '\n');
        }else{
            serverStart(_pt+1)
        }
    })

}

function server(argv){
    
    var pt = '';

    if(argv && argv.port) pt = argv.port;
    else pt = __port;

    if(argv && argv.port === true) pt = __port;

    (argv && argv.cors) ? cors = true : cors = false;

    serverStart(pt);
}
