const { Sequelize, UniqueConstraintError, DataTypes } = require("sequelize");

const express = require("express");
const router = express.Router();

const app = express();
const port = process.env.PORT || 4000;
app.listen(port);

const DB_HOST = "miljobs-db-postgres.postgres.database.azure.com";
const DB_USER = "MiljobsUser@miljobs-db-postgres";
const DB_PASS = "Hatch123";
const DB_NAME = "postgres";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();

const UserModel = require(`../Models/User`);
const UserToUnitModel = require(`../Models/UserToUnit`);

const Users = UserModel(sequelize,DataTypes)
const UsersToUnits = UserToUnitModel(sequelize,DataTypes)

Users.hasMany(UsersToUnits, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
UsersToUnits.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

// console.log(User === sequelize.models.user_data); // true

const getAllUsers = async () => {
  const users = await Users.findAll({});
  console.log(users);
};

const getUserById = async (id) => {
  const user = await Users.findAll({
    where: {
      user_id: id,
    },
    attributes: [
      "first_name",
      "last_name",
      "role",
      "cell_phone",
      "email",
      "last_login",
      "last_update",
      "delete_ind",
    ],
  });
  console.log(user);
};

const addUser = async () => {
  await Users.create({
    user_id: "326324043",
    first_name: "רותם",
    last_name: "פיליפ",
    role: "תפקיד",
    cell_phone: "0000000000",
    email: "rotemphilipp@gmail.com",
  });
};

const deleteUser = async (id) => {
  await Users.destroy({
    where: {
      user_id: id,
    },
  });
};
const updateUser = async (id) => {
  await Users.update(
    { cell_phone: "0538242214" },
    {
      where: {
        user_id: id,
      },
    }
  );
};

const getUsersByUnit = async () => {
  const users = await Users.findAll({
    include: { model: UsersToUnits, required: true },
  });
  console.log(users);
};
// getUserById("316578368");
// getAllUsers();
// addUser()
// deleteUser("11")
getUsersByUnit();

module.exports = router;
