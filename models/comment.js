module.exports = function (sequelize, DataTypes) {
	return sequelize.define("Comment",
	{
		texto:{
			type: DataTypes.STRING,
			validate:{
				notEmpty:{
					msg:"Falta el comentario"
				}
			}
		},
		publicado:{
			type: DataTypes.BOOLEAN,
			defaultValue:false
		}
	},
	{
		classMethods:{
			comentariosNoPublicados: function(){
				return this.aggregate('QuizId','count',{'where':{'publicado':false}})
				.then('succes',function(count){return count});
			},
			comentariosPorPregunta: function(){
				return this.aggregate('QuizId','count',{'distinct':true})
				.then('succes',function(count){return count});
			}
		}
	});
};