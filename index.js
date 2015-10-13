var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    net = require("net"),
    color = require('colorful'),
    __port = 1987,
    server;

module.exports = server;

connListener = function(request, response) {

    var uri = url.parse(request.url).pathname, 
        filename = path.join(process.cwd(), uri);

    // url 解码
    filename = decodeURIComponent(filename);

    console.log(color.green(" INFO "),filename);

    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {        
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });

    });

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
