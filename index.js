var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    net = require("net"),
    color = require('colors-cli'),
    iconv = require('iconv-lite'),
    ctype = require("./lib/content-type"),
    catalog = require('./lib/catalog'),
    confproxy = require('./lib/get-proxy-config'),
    query = require("querystring"),    //解析POST请求
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
    var pxval = confproxy[request.method+' '+uri];
    if(pxval){
        var postData = null,arr = [];
        request.addListener("data",function(postchunk){
            arr.push(postchunk)
        })

        //POST结束输出结果
        request.addListener("end",function(){
            var data= Buffer.concat(arr).toString(),ret;
            try{
                ret = JSON.parse(data);
            }catch(err){}
            request.body = ret;

            if(typeof pxval === "function"){
                pxval = pxval(ret?ret:data,request.url);
            }

            response.writeHead(200, {
                "Content-Type":(function(){
                    if(isJson(pxval) || Object.prototype.toString.call(pxval)){
                        return ctype.getContentType('json') + ';charset=utf-8';
                    }else if(typeof pxval == 'string'){
                        return ctype.getContentType('html') + ';charset=utf-8';
                    }
                    return '';
                })()
            });
            response.write(  iconv.encode(JSON.stringify(pxval), 'utf-8').toString('binary')   , "binary");
            response.end();
            commandLog(200,request,response)
        })
        return;
    }

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

function isJson(obj){
    return typeof(obj) == "object" 
        && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" 
        && !obj.length;
}

// 命令行颜色显示
function commandLog(staus,request,response){
    var code = response.statusCode;
    if(code === 200){
        console.log( ('INFO ' + request.method + ' ' + code.toString() ).green_bt + ' ' + request.url )
    }else{
        console.log( ('INFO ' + request.method + ' ' + code.toString()).red_bt + ' ' + request.url );
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
    
    if(argv && argv.proxy){
        confproxy = confproxy(argv.proxy);
    }

    serverStart(pt);
}
