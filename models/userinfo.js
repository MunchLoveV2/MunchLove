module.exports = function(sequelize, DataTypes) {
  var Userinfo = sequelize.define("Userinfo", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    salt: DataTypes.TEXT,
    createdAt: DataTypes.DATE
  });
  return Userinfo;
};
