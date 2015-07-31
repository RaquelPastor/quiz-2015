var models = require('../models/models.js');

<<<<<<< HEAD
//Autoload - factoriza el código si ruta incluye : quizId
exports.load = function(req,res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz) {
			if(quiz) {
				req.quiz = quiz;
				next();
			}else { next(new Error('No existe quizId=' + quizId)); }
		}
		).catch(function(error) {next(error);});
};

//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(
		function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		}
	).catch(function(error) {next(error);})
=======
//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes});
	})
>>>>>>> 12c3fbea40b73ebad02dda75eaf8f67f36ca6d84
};

// GET /quizes/question pasa a ser /quizes/show
exports.show = function(req, res) {
<<<<<<< HEAD
	res.render('quizes/show', {quiz: req.quiz});
=======
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: quiz});
	})
>>>>>>> 12c3fbea40b73ebad02dda75eaf8f67f36ca6d84
};

//GET /quizes/answer
exports.answer = function(req, res){
<<<<<<< HEAD
	var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
=======
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', 
									{quiz:quiz,
										respuesta: 'Correcto'});
		}else{
			res.render('quizes/answer', 
									{quiz:quiz,
										respuesta: 'Incorrecto'});
>>>>>>> 12c3fbea40b73ebad02dda75eaf8f67f36ca6d84
		}
		res.render('quizes/answer', {quiz:req.quiz, respuesta: resultado});
};

//GET /author
exports.author = function(req, res) {
		res.render('author');

};