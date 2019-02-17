'use strict';
module.exports = (sequelize, DataTypes) => {
  const BandwidthNumber = sequelize.define('BandwidthNumber', {
    forwardingEnabled: DataTypes.BOOLEAN,
    forwardingNumber: DataTypes.STRING
  }, {});
  BandwidthNumber.associate = function(models) {
    BandwidthNumber.belongsTo(models.Group);
  };
  return BandwidthNumber;
};