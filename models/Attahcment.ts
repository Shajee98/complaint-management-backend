import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"

const Attachment = sequelize.define(
  "attachment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fileName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    complaintId: {
        field: "complaint_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "complaints",
          key: "id"
        }
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

Attachment.sync({alter: true})

export default Attachment
