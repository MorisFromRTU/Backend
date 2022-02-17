const Sequelize = require("sequelize");
const { sequelize } = require("..");
const ToDo = require("./ToDo.model");
const Token = require("./Token.model");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    name: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  },
  { sequelize: sequelize, underscored: true, modelName: "user" }
);

User.hasMany(ToDo);
User.hasMany(Token);
Token.belongsTo(User, {
  foreignKey: "userId",
});
ToDo.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = User;
