module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
        type: Sequelize.STRING(32),
        primaryKey: true,
        allowNull: false
      },
      pass: {
        type: Sequelize.STRING,
        allowNull: false
      },
      displayname: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      joindate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    },{
        freezeTableName: true,
        timestamps: false
    });
  
    return User;
  };