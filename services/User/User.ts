import User from "../../models/User"
import UserType from "../../models/UserType"

// Username can either be user_name or user_email attribute of the DB

export const register = async (userInfo: { first_name: string, last_name: string, user_name: string, password: string, user_type_id: number}) => {
    try {
      const admin = await User.create({
        user_name: userInfo.user_name.toLowerCase(),
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
        user_type_id: userInfo.user_type_id
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

export const getUsersByDepartment = async (department_id: number) => {
  try {
    const user = await User.findOne({
      where: {
        department_id: department_id
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

export default {
  register,
  getUserByUserName,
  getUserById,
  updatePassword,
  getUsersByDepartment
}
