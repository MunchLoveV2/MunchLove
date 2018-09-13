var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var Userinfo = sequelize.define("Userinfos", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      isUnique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    accountKey: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [8]
      }
    },
    email: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE
    }
  });
  // generating a hash
  Userinfo.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  // checking if password is valid
  // I dont know what this exactly does....
  Userinfo.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.accountKey);
  };
  Userinfo.associate = function(models) {
    Userinfo.hasMany(models.Items, {
      foreignKey: "owner_id",
      onDelete: "cascade"
    });
    Userinfo.associate = function(models) {
      Userinfo.hasMany(models.Transactions, {
        foreignKey: "renter_id"
      });
    };
  };
  return Userinfo;
};
