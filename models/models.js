var path = require("path");

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

//Cargar el Modelo ORM.
var Sequelize = require("sequelize");

//Usar la BBDD SQLite.
var sequelize = new Sequelize(DB_name,user,pwd,
	{	dialect:dialect,
		protocol: protocol,
		port: port,
		host:host,
		storage:storage, //solo SQLite (.env)
		omitNull:true //solo Postgres
	}
);

//Importar la definicion de la tabla comment en comment.js
var Comment = sequelize.import(path.join(__dirname,"comment"));


//Importar la definicion de la tabla quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,"quiz"));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz; // Exportar definicion de la tabla Quiz.
exports.Comment = Comment;//Exportar el modelo Commet.

//sequelize.sync() crea e inicializa tabla de preguntas en BD.
sequelize.sync().then(function(){
		Quiz.count().then(function(count){
			if(count === 0){
				Quiz.create({
					pregunta:"¿Capital de Italia?",
					respuesta:"Roma",
					tema: "humanidades"
				}).then(function(){
					console.log("Base de datos inicializada");
				});

			}
		});
	});