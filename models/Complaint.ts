import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Complaint = sequelize.define(
  "complaint",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    complaintTypeId: {
      field: "complaint_type_id",
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "complaint_types",
        key: 'id'
      }
    },
    customerNumber: {
        field: "customer_number",
        allowNull: false,
        type: DataTypes.STRING
      },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    departmentId: {
        field: "department_id",
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: "departments",
          key: "id"
        }
    },
    userId: {
      field: "user_id",
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id"
      }
    },
    complaintStatusId: {
      field: "complaint_status_id",
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.INTEGER,
      references: {
        model: "complaint_statuses",
        key: "id"
      }
    },
    fromWhatsapp: {
      field: "from_whatsapp",
      allowNull: false,
      type: DataTypes.BOOLEAN
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

Complaint.sync({alter: true})

export default Complaint
