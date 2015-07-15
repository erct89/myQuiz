var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var authorController = require('../controllers/author_controller');
var sessionController = require('../controllers/session_controller'); 


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Quiz', 
		errors:[] 
	});
});

module.exports = router;

//Autoload de comandos con /:quizId.
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

//Rutas para controlar las sesiones.
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);


//Rutas para /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', sessionController.logRequired, quizController.new);
router.post('/quizes/create', sessionController.logRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.logRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.logRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.logRequired, quizController.destroy);
//Routas para comentarios  de quiz.
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.logRequired, commentController.publish);
//Rutas para /author
router.get('/author',authorController.author);