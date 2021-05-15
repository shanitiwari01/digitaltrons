const Sequelize = require("sequelize");

const sequelize = require("../config/database/sql");

const Slots = sequelize.define(
  "slots",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      comment: "Slot Id",
    },
    slot_name: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: "Slot name",
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "First name",
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "Last name",
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: true,
      comment: "Mobile",
    },
    is_booked: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "slot booked [1-Active 0-Inactive]",
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "slot Status [1-Active 0-Inactive]",
    }
  },
  {
    tableName: "slots",
  }
);

module.exports = Slots;
