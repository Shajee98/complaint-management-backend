import { DataTypes } from "sequelize"
import sequelize from "../config/db.config"
import bcrypt from "bcryptjs"

// Generate and save password hash
const hashPassword = async (user: any) => {
  try {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.SALT_ROUNDS!!, 10)
    )
  } catch (error) {
    console.error(error)
  }
}

const User = sequelize.define(
  "users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    user_name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.CHAR(60)
    },
    user_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user_types",
        key: "id"
      }
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "departments",
        key: "id"
      }
    },
    company_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "complaint_types",
        key: "id"
      }
    },
    createdAt: {
      field: "created_at",
      allowNull: true,
      defaultValue: new Date(),
      type: DataTypes.DATE
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
  },
  {
    underscored: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  }
)

// User.sync({alter: true})

export default User
