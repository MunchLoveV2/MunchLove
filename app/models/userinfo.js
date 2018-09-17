module.exports = function(sequelize, DataTypes) {
  var Userinfo = sequelize.define("Userinfo", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
        len: [1, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      len: [1, 100]
    },
    createdAt: {
      type: DataTypes.DATE
    }
  });
  
  Userinfo.associate = function(models) {
    Userinfo.hasMany(models.Userfavorite, {
      onDelete: "cascade"
    });
  };
  return Userinfo;
};


