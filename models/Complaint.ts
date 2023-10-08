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
    complaintNumber: {
      field: "complaint_number",
      allowNull: false,
      type: DataTypes.STRING
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
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "departments",
          key: "id"
        }
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
    complaintStatusId: {
      field: "complaint_status_id",
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.INTEGER,
      references: {
        model: "complaint_statuses",
        key: "id"
      }
    }
  },
  {
    underscored: true,
    createdAt: true,
    updatedAt: true
  }
)

Complaint.sync({alter: true})

export default Complaint
