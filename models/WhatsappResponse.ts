import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"

const WhatsappResponse = sequelize.define(
  "whatsapp_response",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    response: {
      allowNull: false,
      type: DataTypes.STRING
    },
    customerNumber: {
        field: "customer_number",
        type: DataTypes.STRING,
        allowNull: false
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

WhatsappResponse.sync({alter: true})

export default WhatsappResponse
