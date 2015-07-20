var models = require('../models/models.js');

var statistics={
	quizes:0,
	comments:0,
	commentsUnPublished:0,
	commentsQuizes:0
};

var errors=[];

exports.calculate = function(req, res, next){
	models.Quiz.count()
	.then(function(count){
		statistics.quizes = count;
		return models.Comment.count();
	}).then(function(count){
		statistics.comments = count;
		return models.Comment.comentariosNoPublicados();
	}).then(function(count){
		statistics.commentsUnPublished = count;
		return models.Comment.comentariosPorPregunta();
	}).then(function(count){
		statistics.commentsQuizes = count;
	}).catch(function(err){
		errors.push(err);
	}).finally(function(){
		next();
	});
}

//Get /statistics
exports.show = function(req, res){
	res.render('statistics/show',{statistics:statistics,errors:errors});
}