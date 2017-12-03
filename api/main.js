'use strict'

//REQUERIMIENTOS

	var express = require('express');
	var router = express.Router();

	//Requerimiento de modelo speciality
	var Main = require('../models/main');


//OPERACIONES

	// READ

		// Operacion Read a toda la coleccion
		router.route('/')
			.get(function(req,res){
				// Obtener toda la coleccion specialities
				Main.find()
				.then( function(main) {
					// Servir coleccion  
					res.json(main);
				})
			});
	
	// CREATE

		// Operacion Create en la coleccion
		router.route('/')
		.post(function(req,res){
			console.log(req.body);
			// Obtencion de variables del body
			var name = req.body.name;
			var surName = req.body.surName;
			// Creacion de un nuevo registro de especialidad
			var main = new Main({ 
				name: name, 
				surName: surName 
			})
			// Almacenamiento del registro en la base de datos
			main.save(function(err) {
				if (err) {
					// Si hay un error al momento de guardar el registro 
					//nos muestra succes:false y cual fue el error 
					console.log(err);
					res.json({success:false,error:err});
				} else {
					// Si el registro se completo sin errores 
					// nos devuelve succes:true y el registro creado
					res.json({success:true,main:main});
				}
			})
		});

	// UPDATE

		// Operacion Update de un registro en particular
		router.route('/:name')
			.put(function(req,res){
				// Obtencion de parametros de url
				var name = req.params.name;
				// Obtencion de variables del body
				var new_name = req.body.name;
				var new_surName = req.body.surName;
				// Busqueda del registro por su nombre unico
				Main.findOne({name:name})
				.then( function(main) {
					// Si hay actualizacion en el nombre
					(new_name) ? main.name = new_name : null;
					(new_surName) ? main.surName = new_surName : null;
					// Si hay actualizacion en la imagen 

					// Almacenamiento del registro en la base de datos
					main.save(function(err){
						if(err) {
							// Si hay un error al momento de guardar el registro 
							//nos muestra succes:false y cual fue el error 
							console.log(err);
							res.json({success:false,error:err});
						}else{
							// Si el registro se completo sin errores 
							// nos devuelve succes:true y el registro creado
							res.json({success:true,main:main})
						}	
					})
				})
			});


//EXPORTACION
	module.exports = router;