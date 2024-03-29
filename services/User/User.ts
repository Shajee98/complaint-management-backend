import ComplaintStatus from "../../models/ComplaintStatus"
import ComplaintType from "../../models/ComplaintType"
import Department from "../../models/Department"
import User from "../../models/User"
import UserType from "../../models/UserType"

// Username can either be user_name or user_email attribute of the DB

export const register = async (userInfo: { first_name: string, last_name: string, user_name: string, password: string, user_type_id: number, department_id: number, company_type_id: number, email: string}) => {
    try {
      const admin = await User.create({
        user_name: userInfo.user_name.toLowerCase(),
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
        user_type_id: userInfo.user_type_id,
        department_id: userInfo.department_id,
        company_type_id: userInfo.company_type_id,
        email: userInfo.email
      })
      if (!admin) {
        return
      }
  
      return {
        admin: admin.dataValues
      }
    } catch (error) {
      return error
    }
  }

export const getUserByUserName = async (user_name: string) => {
  try {
    const user = await User.findOne({
      where: {
        user_name: user_name.toLowerCase()
      },
      include: {
        model: UserType,
        as: "user_type"
      }
    })

    if (!user) {
      return false
    }

    return user.dataValues
  } catch (error) {
    console.error(error)
  }
}

export const getUserById = async (userId: number | undefined) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: UserType,
          as: "user_type"
        },
        {
          model: Department,
          as: "department"
        }
      ]
    })

    if (!user) {
      return false
    }

    return user.dataValues
  } catch (error) {
    console.error(error)
  }
}

export const getUsersByDepartment = async (department_id: number) => {
  try {
    const user = await User.findAll({
      where: {
        department_id: department_id,
        user_type_id: 3
      },
      include: {
        model: UserType,
        as: "user_type"
      }
    })

    if (!user) {
      return false
    }

    return user
  } catch (error) {
    console.error(error)
  }
}

export const getUserTypes = async () => {
  try {
    const userTypes = await UserType.findAll()

    if (!userTypes) {
      return false
    }

    return userTypes
  } catch (error) {
    console.error(error)
  }
}

export const getAllComplaintStatus = async () => {
  try {
    const statuses = await ComplaintStatus.findAll();
    
    return statuses;
  } catch (error) {
    console.error(error);
  }
};

export const getComplaintTypes = async () => {
  try {
    const complaintType = await ComplaintType.findAll()
    return complaintType
  } catch (error) {
    console.error(error)
  }
}

export const updatePassword = async (newPassword: string, userId: number) => {
  try {
    const user = await User.update(
      { password: newPassword },
      {
        where: { id: userId },
        individualHooks: true
      }
    )

    if (!user) {
      return false
    }

    return true
  } catch (error) {
    console.error(error)
  }
}

export const getAllUsers = async (user_department_id: any) => {
  try {
    let users: any[] = [] 
    if (user_department_id == "null")
    {
      users  = await User.findAll({
        include: [{
          model: Department,
          as: 'department'
        }, {
          model: UserType,
          as: "user_type"
        }]
      });
    }
    else {
      users  = await User.findAll({
        include: [{
          model: Department,
          as: 'department'
        }, {
          model: UserType,
          as: "user_type"
        }],
        where: {
          department_id: Number(user_department_id)
        }
      });
    }
    
    return users;
  } catch (error) {
    console.error(error);
  }
}

export const deleteUser =async (user_id: any) => {
  try {
    const user = await User.destroy({
      where: {
        id: user_id
      }
    })
    if (user == 1)
    {
      return {deleted: true}
    }
    return {deleted: false}
  } catch (error) {
    console.error(error);
  }
}

export default {
  register,
  getUserByUserName,
  getUserById,
  updatePassword,
  getUsersByDepartment,
  getAllComplaintStatus,
  getUserTypes,
  getComplaintTypes,
  getAllUsers,
  deleteUser
}
