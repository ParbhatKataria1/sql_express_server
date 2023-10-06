module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("admins", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("teacher", "superadmin"),
      allowNull: false,
      defaultValue: "teacher",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Admin;
};
