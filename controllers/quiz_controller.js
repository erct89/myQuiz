var models = require('../models/models.js');


//AutoLoad carga quiz para comprobar si existe algún error.
exports.load= function(req, res, next, quizId){
	models.Quiz.findOne({
		where:{id:quizId},
		include:[{model: models.Comment}]
	}).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error("No existe quizId = "+quizId));
		}
	}).catch(function(error){
		next(error);
	});

};


//GET /quizes
exports.index = function(req,res){
	var like = '%'
	if(req.query.search){
		if(req.query.search.trim().length>0){//Mirar si quitando espacios del inicio y el fin de la cadena su tamaño es no es 0;
			like = req.query.search.trim(); //Quitar espacios del inicio.
			like = like.trim().replace(/(\s)+/g,"%"); //Sustitucion de espacios por %
			like = "%"+like+"%";
		}
	}
	models.Quiz.findAll({
		where:{
			pregunta:{
				$like:like
			}
		}
	}).then(function(quizes){
		res.render('quizes/index',{
			quizes:quizes,
			like:req.query.search,
			errors:[]
		});
	}).catch(function(error){
		next(error);
	});
};


//GET /quizes/:quizId(\\d+)
exports.show = function(req,res){
	res.render('quizes/show',{
		quiz:req.quiz,
		errors:[]
	});
};


//GET /quizes/:quizId(\\d+)/answer
exports.answer = function(req,res){
	var resultado = "Incorrecto";
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = "Correcto";
	}
	res.render('quizes/answer',{
		quiz:req.quiz,
		respuesta:resultado,
		errors:[]
	});
};


//GET /quizes/new
exports.new = function(req,res){
	var quiz = models.Quiz.build(
		{pregunta:"Pregunta", respuesta:"Respuesta", tema:"otro"}
		);
	res.render("quizes/new",{quiz: quiz, errors:[]});
};


//POST /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build(req.body.quiz);

    quiz.validate().then(function(err){
    	if(err){
    		res.render("quizes/new",{
    			quiz:quiz, 
    			errors:err.errors
    		});
    	}else{
    		quiz.save({fields: ['pregunta', 'respuesta', 'tema']}).then(function() {
    			res.redirect('/quizes');
    		});
    	}
    });
    
};


//GET /quizes/:quizId(\\d+)/edit
exports.edit = function(req,res){
	var quiz = req.quiz;
	res.render('quizes/edit',{
		quiz:quiz,
		errors:[]
	});
};


//PUT /quizes/:quizId(\\d+)/edit
exports.update = function(req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz.validate().then(function(err){
		if(err){
			res.render('quizes/edit',{
				quiz:quiz,
				errors:err.errors
			});
		}else{
			req.quiz.save({
				fields:["pregunta", "respuesta", "tema"]
			}).then(function(){
				res.redirect('/quizes');
			});
		}
	});
};


//DELETE /quizes/:quizId(\\d+)
exports.destroy = function(req,res){
	req.quiz.destroy().then(
		function(){
			res.redirect('/quizes');
		}).catch(function(err){
			next(err);
		});
};

