const { Sequelize } = require("sequelize");
const { Model, INTEGER, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserToUnit = sequelize.define(
    'user_to_unit',
    {
      user_id: {
        type: DataTypes.STRING,
        foreignKey: true
      },
      unit_id: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true
    }
  );
  return UserToUnit;
};
