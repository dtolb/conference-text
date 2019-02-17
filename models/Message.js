'use strict';
module.exports = (sequelize, DataTypes) => {
  const MESSAGE = sequelize.define('MESSAGE', {
    bandwidthMessageId: DataTypes.STRING,
    apiResposne: DataTypes.JSONB,
    failed: DataTypes.BOOLEAN,
    direction: DataTypes.ENUM('in', 'out'),
    date: DataTypes.DATE,
    incomingCallback: DataTypes.JSONB,
    deliveredCallback: DataTypes.JSONB,
    failedCallback: DataTypes.JSONB
  }, {});
  MESSAGE.associate = function(models) {
    Message.belongsTo(models.Member, {
      foreignKey: 'memberId',
      onDelete: 'CASCADE',
    })
  };
  return MESSAGE;
};