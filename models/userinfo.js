module.exports = function(sequelize, DataTypes) {
  var Userinfos = sequelize.define("Userinfos", {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
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
    createdAt: DataTypes.DATE
  });
  // generating a hash
  Userinfos.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  // checking if password is valid
  Userinfos.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.accountKey);
  };
  Userinfos.associate = function(models) {
    Userinfos.hasMany(models.Items, {
      foreignKey: "owner_id",
      onDelete: "cascade"
    });
    Userinfos.associate = function(models) {
      Userinfos.hasMany(models.Transactions, {
        foreignKey: "renter_id"
      });
    };
  };
  return Userinfos;
};
