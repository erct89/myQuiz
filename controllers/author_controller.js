//GET /author
exports.author = function(req,res){
	res.render('author',{
		author:[{nombre:"Emilio",
		apellidos:"Añover García",
		foto:"http://www.publispain.com/simpson/galeria/homero/homer22.gif",
		video:"https://www.youtube.com/embed/UrrkX1ivhmE"}],
		errors:[]

	});
}