module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      useremail: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(22),
        allowNull: false
      },
      creationtime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      profilepic: {
        type: Sequelize.STRING
      },
      profilename: {
        type: Sequelize.STRING(32),
        allowNull: false
      }
    },{
        freezeTableName: true,
        timestamps: false
    });
  
    return Chat;
  };