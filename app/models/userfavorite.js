module.exports = function(sequelize, DataTypes) {
    var Userfavorite = sequelize.define("Userfavorite", {
      favoritesID: DataTypes.TEXT
    });
   

  Userfavorite.associate = function(models) {
      Userfavorite.belongsTo(models.Userinfo, {
        foreignKey: {
            allowNull: false
        }
      });
  };
  return Userfavorite;
};