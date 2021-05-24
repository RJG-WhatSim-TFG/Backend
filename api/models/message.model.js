module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
      chatid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      type: {
        type: Sequelize.BOOLEAN,
        primaryKey: true,
        allowNull: false
      },
      time: {
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },{
        freezeTableName: true,
        timestamps: false
    });
  
    return Message;
  };