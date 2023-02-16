const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    'user_data',
    {
      user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      cell_phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      last_login: { type: DataTypes.DATE },
      last_update: { type: DataTypes.DATE, defaultValue: new Date() },
      delete_ind: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      // freezeTableName: true
      tableName: 'user_data'
    }
  );
  return User;
};
