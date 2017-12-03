'use strict'

//REQUERIMIENTOS

	var express = require('express');
	var router = express.Router();

	//Requerimiento de modelo speciality
	var Friend = require('../models/friend');


//OPERACIONES

	// READ

		// Operacion Read a toda la coleccion
		router.route('/amigos')
			.get(function(req,res){
				// Obtener toda la coleccion specialities
				Friend.find()
				.then( function(friend) {
					// Servir coleccion  
					res.json(friend);
				})
			});

		// Operacion Read a un registro en particular
		router.route('/amigos/:name')
			.get(function(req,res){
				// Obtencion de parametros de url
				var name = req.params.name;
				// Busqueda de resgitro particular
				Friend.findOne({name:name})
				.then( function(friend) {
					// Servir registro
					res.json(friend);  
				})
			});

	// CREATE

		// Operacion Create en la coleccion
		router.route('/amigos')
			.post(function(req,res){
				console.log(req.body);
				// Obtencion de variables del body
				var name = req.body.name;
				var surName = req.body.surName;
				// Creacion de un nuevo registro de especialidad
				var friend = new Friend({ 
					name: name, 
					surName: surName 
				})
				// Almacenamiento del registro en la base de datos
				friend.save(function(err) {
					if (err) {
						// Si hay un error al momento de guardar el registro 
						//nos muestra succes:false y cual fue el error 
						console.log(err);
						res.json({success:false,error:err});
					} else {
						// Si el registro se completo sin errores 
						// nos devuelve succes:true y el registro creado
						res.json({success:true,friend:friend});
					}
				})
			});

	// UPDATE

		// Operacion Update de un registro en particular
		router.route('/amigos/:name')
			.put(function(req,res){
				// Obtencion de parametros de url
				var name = req.params.name;
				// Obtencion de variables del body
				var new_name = req.body.name;
				var new_surName = req.body.surName;
				// Busqueda del registro por su nombre unico
				Friend.findOne({name:name})
				.then( function(friend) {
					// Si hay actualizacion en el nombre
					(new_name) ? friend.name = new_name : null;
					(new_surName) ? friend.surName = new_surName : null;
					// Almacenamiento del registro en la base de datos
					friend.save(function(err){
						if(err) {
							// Si hay un error al momento de guardar el registro 
							//nos muestra succes:false y cual fue el error 
							console.log(err);
							res.json({success:false,error:err});
						}else{
							// Si el registro se completo sin errores 
							// nos devuelve succes:true y el registro creado
							res.json({success:true,friend:friend})
						}	
					})
				})
			});

	// DELETE

		// Operacion Update de un registro en particular
		router.route('/amigos/:name')
			.delete(function(req,res){
				// Obtencion de parametros de url
				var name = req.params.name;
				// Busqueda del registro por su nombre unico
				Friend.findOne({name:name})
				.then( function(friend) {
					// Eliminacion del registro
					friend.remove(function(err){
						if(err) {
							// Si hay un error al momento de guardar el registro 
							//nos muestra succes:false y cual fue el error 
							console.log(err);
							res.json({success:false,error:err});
						}else{
							// Si el registro se completo sin errores 
							// nos devuelve succes:true
							res.json({success:true})
						}	
					})
				})
			});
//EXPORTACION
	module.exports = router;