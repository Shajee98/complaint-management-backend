import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"

const WhatsappMessage = sequelize.define(
  "whatsapp_message",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    message: {
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
    createdAt: false,
    updatedAt: false
  }
)

WhatsappMessage.sync({alter: true})

export default WhatsappMessage
