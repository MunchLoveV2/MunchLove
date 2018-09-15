module.exports = function(sequelize, Sequelize) {
  var Userinfos = sequelize.define("Userinfos", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
      isUnique: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    accountKey: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        len: [1, 100]
      }
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      len: [1, 100]
    },
    createdAt: {
      type: Sequelize.DATE
    }
  });
  return Userinfos;
};
