'use strict'

//REQUERIMIENTO
var router_main = require('../api/main.js');
var router_friend = require('../api/friend.js');

// RUTEO
var routers = function(server) {
	server.use('/api/', router_main);
	server.use('/api/', router_friend);
};

//EXPORTACION
module.exports = routers;