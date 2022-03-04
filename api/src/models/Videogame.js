const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    image: {
      type: DataTypes.STRING
    },
  });
};