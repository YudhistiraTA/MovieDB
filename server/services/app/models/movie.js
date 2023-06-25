"use strict";
const { Model } = require("sequelize");
const stringToSlug = require("../helpers/stringToSlug");
module.exports = (sequelize, DataTypes) => {
	class Movie extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Movie.belongsTo(models.Genre, {onDelete:  "CASCADE"});
			Movie.hasMany(models.Cast, {onDelete:  "CASCADE"})
		}
	}
	Movie.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Movie title is required"
					},
					notNull: {
						msg: "Movie title is required"
					}
				}
			},
			slug: {
				type: DataTypes.STRING,
			},
			synopsis: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Movie synopsis is required"
					},
					notNull: {
						msg: "Movie synopsis is required"
					}
				}
			},
			trailerUrl: DataTypes.STRING,
			imgUrl: DataTypes.STRING,
			rating: {
				type: DataTypes.INTEGER,
				validate: {
					validateMinimum(value) {
						if (+value < 1)
							throw { msg: "Minimum movie rating is 1" };
					}
				}
			},
			GenreId: DataTypes.INTEGER,
			AuthorId: DataTypes.STRING
		},
		{
			hooks: {
				beforeCreate(movie) {
					movie.slug = stringToSlug(movie.title);
				},
				beforeUpdate(movie) {
					movie.slug = stringToSlug(movie.title);
				}
			},
			sequelize,
			modelName: "Movie"
		}
	);
	return Movie;
};
