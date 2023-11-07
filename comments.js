// Create web server
// Run: node comments.js
// Open browser: http://localhost:3000

// Import modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// Create server
http.createServer(function (req, res) {
    // Get url
    var pathname = url.parse(req.url).pathname;
    // Get method
    var method = req.method.toUpperCase();

    // Check url and method
    if (pathname === '/' && method === 'GET') {
        // Read file
        fs.readFile('./comments.html', function (err, data) {
            // Check read file
            if (err) {
                // Send response
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('404 Not Found');
            } else {
                // Send response
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        });
    } else if (pathname === '/comments' && method === 'GET') {
        // Read file
        fs.readFile('./comments.json', function (err, data) {
            // Check read file
            if (err) {
                // Send response
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('404 Not Found');
            } else {
                // Send response
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(data);
            }
        });
    } else if (pathname === '/comments' && method === 'POST') {
        // Body
        var body = '';
        // Add listener for data
        req.on('data', function (chunk) {
            // Append chunk to body
            body += chunk;
        });
        // Add listener for end
        req.on('end', function () {
            // Parse body
            var params = qs.parse(body);
            // Read file
            fs.readFile('./comments.json', function (err, data) {
                // Check read file
                if (err) {
                    // Send response
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    res.end('404 Not Found');
                } else {
                    // Convert data
                    var comments = JSON.parse(data);
                    // Add comment
                    comments.push(params);
                    // Write file
                    fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
                        // Check write file
                        if (err) {
                            // Send response
                            res.writeHead(500, {
                                'Content-Type': 'text/html'
                            });
                            res.end('500 Server Error');
                        } else {
                            // Send response
                            res.writeHead(200, {
                                'Content-Type': 'application/json'
                            });
                            res.end(JSON.stringify(params));
                        }
                    });
                }
            });
        });
    } else {
        // Send response
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('404 Not Found');
    }
}).listen(3000);

