var express = require('express');
var fs = require('fs');
var url = require("url");
var path = require("path");
var app = express();
app.get('/', function (req, res) {
	var uri = url.parse(req.url).pathname;
	if (uri == "/")
	{
		uri = "public/index.html";
	}
	var dir = __dirname;
	var filename = path.join(dir, uri);

	console.log(filename);

	fs.readFile( filename,
		function (err, data)
		{
			console.log(err)
			if (err)
			{
				res.writeHead(500);
				return res.end('Error loading index.html');
			}

			var ext = path.extname(filename)
			res.setHeader('content-type',contentType(ext));
			res.writeHead(200);
			res.end(data);
		});
});
app.use(express.static('build'))

app.listen(3000, function () {
  console.log('Test listening on port 3000!');
});

function contentType(ext) {
    var ct;

    switch (ext) {
    case '.html':
        ct = 'text/html';
        break;
    case '.css':
        ct = 'text/css';
        break;
    case '.js':
        ct = 'text/javascript';
        break;
	case '.svg':
	case '.png':
	case '.jpg':
	case '.jpeg':
		ct = "application/octet-stream";
		break;
    default:
        ct = 'text/plain';
        break;
    }

    return {'Content-Type': ct};
}