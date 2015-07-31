var models = require('../models/models.js');

//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};

// GET /quizes/question pasa a ser /quizes/show
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', {quiz: quiz});
	})
};

//GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', 
									{quiz:quiz,
										respuesta: 'Correcto'});
		}else{
			res.render('quizes/answer', 
									{quiz:quiz,
										respuesta: 'Incorrecto'});
		}
	})
};

//GET /author
exports.author = function(req, res) {
		res.render('author');

};