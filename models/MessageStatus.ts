import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"

const MessageStatus = sequelize.define(
  "message_status",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    messageStatus: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    serviceEndDate: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      field: "created_at",
      allowNull: false,
      defaultValue: new Date(),
      type: DataTypes.DATE
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    underscored: true,
    createdAt: true,
    updatedAt: true
  }
)

MessageStatus.sync({alter: true})

export default MessageStatus
