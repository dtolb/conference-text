'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.Member, {
      foreignKey: 'memberId',
      as: 'members',
    });

    Group.hasOne(models.BandwidthNumber, {
      foreignKey: 'bandwidthNumberId',
      as: 'members',
    })

    Group.belongsTo(models.User);
  };
  return Group;
};