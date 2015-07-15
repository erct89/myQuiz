var models = require('../models/models.js');

//Autoload.
exports.load = function(req, res, next, commentId){
	console.log("Id comentario:"+commentId);
	models.Comment.findOne({
		where:{id:commentId}
	}).then(function(comment){
		if(comment){
			req.comment = comment;
			next();
		}else{
			next(new Error("No existe el comentario "+commentId));
		}	
	}).catch(function(err){
		next(err);
	});
};

//GET /quizes/:quizId(\\d+)/comment/new
exports.new = function(req,res){
	res.render('comments/new.ejs',{quizId:req.params.quizId, errors:[]});
};

//Post /quizes/:quizId(\\d+)/comment
exports.create = function(req,res){
	var comment = models.Comment.build({
			texto:req.body.comment.texto,
			QuizId:req.params.quizId
		});

	comment.validate().then(function(err){
		if(err){
			res.render('comments/new.ejs',{
				comment:comment,
				quizId:req.params.quizId,
				errors:err.errors
			});
		}else{
			comment.save().then(function(){
				res.redirect('/quizes/'+req.params.quizId);
			});
		}
	});
};

//GET /quizes/:quizId(\\d+)/commnets/:commentId(\\Id)/publish
exports.publish = function(req,res){
	req.comment.publicado = true;
	req.comment.save({
			fields:['publicado']
		}).then(function(comment){
			res.redirect('/quizes/'+req.params.quizId);
		}).catch(function(err){
			next(err);
		});
};
