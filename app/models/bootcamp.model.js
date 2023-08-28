module.exports = (sequelize, DataTypes) => {
  const Bootcamp = sequelize.define("bootcamps", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 5,
        max: 10,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Bootcamp;
};
