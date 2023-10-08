import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"

const Department = sequelize.define(
  "departments",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
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

Department.sync({alter: true})

export default Department
