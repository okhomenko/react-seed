var http = require('http');

var comments = [];

http.createServer(function (req, res) {

    function allowCORS() {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
    }

    function writeComments() {
        res.write(JSON.stringify(comments));
    }

    function addComment(comment) {
        comments.push(comment);
    }

    console.log(req.method + ': ' + req.url);
    allowCORS();
    switch(true) {
        case req.method === 'GET' && req.url === '/comments':
            writeComments();
            res.end();
            break;
        case req.method === 'POST' && req.url === '/comments':
            var data = '';
            req.on('data', function (chunk) {
                if(chunk) data += chunk.toString();
            });
            req.on('end', function () {
                addComment(JSON.parse(data));
                writeComments();
                res.end();
            });
            break;
        default:
            res.end();
            break;
    }


}).listen(3000);