// Definicion del modelo de Quiz.

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Quiz',
		{
			pregunta: {
				type:DataTypes.STRING,
				validate:{
					notEmpty:{
						msg:'Falta la pregunta'
					}
				}
			},
			respuesta: {
				type:DataTypes.STRING,
				validate:{
					notEmpty:{
						msg:'Falta la respuesta'
					}
				}
			},
			tema:{
				type:DataTypes.ENUM,
				values:['otro','humanidades','ocio','ciencia','tecnologia'],
				validate:{
					notEmpty:{
						msg:'Falta la tematica'
					}
				}
			}
		});
}