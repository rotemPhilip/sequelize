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
const LoginModel = require(`../Models/Login`);
const User = require("../Models/User");

const Users = UserModel(sequelize, DataTypes);
const UsersToUnits = UserToUnitModel(sequelize, DataTypes);
const Login = LoginModel(sequelize, DataTypes);

UsersToUnits.removeAttribute("id");
Login.removeAttribute("id");

Users.hasMany(UsersToUnits, {
  foreignKey: "user_id",
});
UsersToUnits.belongsTo(Users, {
  foreignKey: "user_id",
});

Login.belongsTo(Users, {
  foreignKey: "user_id",
});

Users.hasMany(Login, {
  foreignKey: "user_id",
});

// console.log(User === sequelize.models.user_data); // true

const addLogin = async () => {
  await Login.create({
    user_id: "326324043",
  });
};

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

const getUsersWithUnits = async () => {
  const users = await Users.findAll({
    attributes: ["first_name"],
    include: { model: UsersToUnits, attributes: ["unit_id"], required: true },
  });

  const newData = users.map((elem) =>
    elem.user_to_units.map((ele) => ele.unit_id)
  );

  return users;
};

const getUsersByUnit = async (id) => {
  const users = await Users.findAll({
    attributes: ["first_name", "last_name"],
    include: {
      model: UsersToUnits,
      attributes: ["unit_id"],
      where: {
        unit_id: id,
      },
    },
  });

  return users;
};

const getUsersUnitAndLogin = async (id) => {
  const users = await Login.findAll({
    attributes: ["timestamp", "user_id"],

    include: [
      {
        model: Users,
        attributes: ["first_name", "last_name"],
        required: true,
      },
    ],
  });

  return users;
};

app.get("/", async (req, res) => {
  const data = await getUsersUnitAndLogin();

  res.send(data);
});

module.exports = router;
