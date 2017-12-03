'use strict'

// Requerimiento de mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

// Definición del esquema
var friendSchema = new Schema({
	name: {type: String, required: true},
	surName: {type: String, required: true },
})

// Convertimos a modelo y exportamos
module.exports = mongoose.model('friend', friendSchema)
