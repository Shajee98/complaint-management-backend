import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"

const Comment = sequelize.define(
  "comment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
        field: "user_id",
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
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
    createdAt: false,
    updatedAt: false
  }
)

// Comment.sync({alter: true})

export default Comment
