#!/usr/bin/env node
let WebSocketServer = require('websocket').server;
let http = require('http');

let server = http.createServer((request, response) => {
	console.log((new Date()) + ': Received request for ' + request.url);
	response.writeHead(404);
	response.end();
});
server.listen(8080, () => {
	console.log((new Date()) + ': Server is listening on port 8080');
});

let wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: true
});

wsServer.on('connect', connection => {
	console.log((new Date()) + ': Connection accepted.');
	let intervalID = setInterval(
		() => {
			if (Math.random() > 0.5) {
				connection.sendUTF(JSON.stringify({
					'Actual Incline': String(Math.round(Math.random() * 5))
				}));
			}
			else {
				connection.sendUTF(JSON.stringify({
					'MPH': String(Math.round(Math.random() * 10))
				}));
			}
		},
		5000
	);

	connection.sendUTF(JSON.stringify({
		'Actual Incline': '3.0',
		'MPH': '6'
	}));

	connection.on('message', message => {
		if (message.type === 'utf8') {
			console.log((new Date()) + ': Received Message: ' + message.utf8Data);
			// connection.sendUTF(message.utf8Data);
		}
	});
	connection.on('close', () => {
		clearInterval(intervalID);
		console.log((new Date()) + ': Peer ' + connection.remoteAddress + ' disconnected.');
	});
});