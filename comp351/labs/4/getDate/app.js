let http = require('http');
const math = require('./math');
http.createServer(function (request, response) {
    console.log("Connection!");
    response.writeHead(200, {'Content-type' : 'text/plain'});
    response.write("Response's coming from server ... \n");
    response.write("3 + 3 = "+math.add(3, 3)+"\n");
    response.
    write("5 - 3 = "+math.subtract(5, 3));
    response.end();
}).listen(2096);
console.log('listening...');