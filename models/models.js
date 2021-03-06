var path = require('path');

//Postgres DATABASE_URL = postgress://user:passwd@host:port/database
//SQLite DATABASE_URL = sqLite://:@:/

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
var sequelize = new Sequelize(DB_name, user, pwd,
											{dialect: protocol, 
											 protocol: protocol,
											 port: port,
											 host: host,
											 storage: storage, //solo sQlite (.env)
											 omitNull: true   //solo Postgres
											}
								);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//Importar la definicion de la tabla Comments en comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; //exportar la definicion de la tabla Quiz
exports.Comment = Comment; 

//sequelize.sync() crea e inicializa tabla de preguntas en BDs
sequelize.sync().then(function() {
	//success(..) ejecuta el manejador una vez creada la tabla -> SE CAMBIA POR THEN
	Quiz.count().then(function(count){
		if(count=== 0 ){
			Quiz.create({pregunta: 'Capital de Italia',
									 respuesta: 'Roma',
									 tema: 'humanidades'
									});
			Quiz.create({pregunta: 'Capital de Portugal',
									 respuesta: 'Lisboa',
									 tema: 'humanidades'
									})
					.then(function(){console.log('Base de datos inicializada')});
				};
		});
	});