var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    net = require("net"),
    color = require('colorful'),
    catalog = require('./lib/catalog'),
    __port = 1987,
    server;

module.exports = server;

connListener = function(request, response) {

    var uri = url.parse(request.url).pathname, 
        filename = path.join(process.cwd(), uri);

    // url 解码
    filename = decodeURIComponent(filename);

    console.log(color.green(" INFO "),filename);

    var html = catalog(filename);

    if( fs.existsSync(filename) && fs.statSync(filename).isDirectory() && fs.existsSync(filename + '/index.html') ) filename += '/index.html';
    if( fs.existsSync(filename) && fs.statSync(filename).isFile() ){

        fs.readFile(filename, "binary", function(err, file) {
            response.writeHead(200);
            response.write(file, "binary");
            response.end();
            return;
        });

    }else{
        
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
        return;

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

function server(_port){

    var pt = _port || __port;

    probe(pt,function(bl,_pt){
        if(bl === true){
            // ssr(_pt)
            server = http.createServer(connListener);
            server = server.listen(parseInt(_pt, 10));
            console.log("\n  Static file server running at" + color.green("\n\n=> http://localhost:" + _pt ) + '\n');
        }else{
            server(_pt+1)
        }
    })

}
