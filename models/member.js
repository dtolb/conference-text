'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    telephoneNumber: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    optIn: DataTypes.BOOLEAN,
    optOut: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN
  }, {});
  Member.associate = function(models) {
    Member.belongsTo(models.Group, {
      foreignKey: 'groupId',
      onDelete: 'CASCADE',
    });

    Member.hasMany(models.Message, {
      foreignKey: 'messageId',
      onDelete: 'CASCADE',
    });
  };
  return Member;
};