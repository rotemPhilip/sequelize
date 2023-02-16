const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Login = sequelize.define(
    "login",
    {
      user_id: {
        type: DataTypes.STRING,
        foreignKey: true,
      },
      timestamp: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    {
      timestamps: false,
      // freezeTableName: true
      tableName: "login",
    }
  );
  return Login;
};
