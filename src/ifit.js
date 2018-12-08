let WebSocketClient = require('websocket').client,
	onDeath = require('death'),
	settings = require('./settings');

/*
 State.
 */
let connected = false,
	client,
	ensureConnectedID;

/*
 Public API.
 */
exports.connect = connect;

/*
 Implementation.
 */

function connect() {
	client = new WebSocketClient();
	client.on('connectFailed', onConnectFailed);
	client.on('connect', onConnected);
	ensureConnectedID = setInterval(ensureConnected, 5000);
	ensureConnected();
	onDeath(cleanUp);
}

function ensureConnected() {
	if (!connected) {
		console.log('Connecting...');
		client.connect(`ws://${settings.ip}/control`);
	}
}

function onConnectFailed(error) {
	connected = false;
	console.log('Connect Error: ' + error.toString());
}

function onConnected(connection) {
	console.log('Connected!');
	connected = true;
	connection.on('message', onMessage);
	connection.on('error', onError);
	connection.on('close', onClose);
	// TODO: We can control the treadmill, too.
	// connection.sendUTF(JSON.stringify({ 'Actual Incline': '3.0' }));
	// connection.sendUTF(JSON.stringify({ 'MPH': '6' }));
}

function onMessage(message) {
	let data = message.utf8Data || message.data;
	if (data === '{}') {
		return;
	}
	console.log('Message:', data);
	let parsed = safeJSONParse(data);
	if (parsed.values) {
		parsed = parsed.values;
	}
	if (parsed['MPH'] !== undefined) {
		let mph = safeParseFloat(parsed['MPH']);
		console.log('- Speed Received: ' + mph + 'mph');
	}
	if (parsed['Actual Incline'] !== undefined) {
		let incline = safeParseFloat(parsed['Actual Incline']);
		console.log('- Incline Received: ' + incline + '%');
	}
}

function safeJSONParse(string) {
	try {
		return JSON.parse(string);
	}
	catch (err) {
		return null;
	}
}

function safeParseFloat(val) {
	try {
		return parseFloat(val);
	}
	catch (err) {
		return 0;
	}
}

function onError(error) {
	console.error('Error: ' + error.toString());
}

function onClose() {
	connected = false;
	console.log('Closed');
}

function cleanUp() {
	clearInterval(ensureConnectedID);
	try {
		if (client) {
			client.abort();
			client = null;
		}
	}
	catch (err) {
		console.error(err);
	}
}
