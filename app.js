#!/usr/bin/env node
let oneTime = require('./src/oneTimeSetup');

oneTime.setup(() => {

	let ifit = require('./src/ifit'),
		onDeath = require('death');

	/*
	 Initialization.
	 */
	ifit.connect();
	onDeath(cleanUp);

	/*
	 Implementation.
	 */
	function cleanUp() {
		console.log('Shutting down...');
		setTimeout(() => process.exit(0), 1000);
	}

});
