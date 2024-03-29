import userService from "../../../../../../services/User/User"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { serverErrorResponse, successResponse } from "../../../../../../services/Response/Response";

export const getUsersByDepartment: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params
    //   const id = req.user?.id
      const users = await userService.getUsersByDepartment(Number(id))
      if (!users) {
        return serverErrorResponse(res, responses.ORDER_CREATED);
      }
  
      return successResponse(res, {staffs: users});
    } catch (error) {
      next(error)
    }
  };

export const getUserTypes: RequestHandler = async (req, res, next) => {
    try {
    //   const id = req.user?.id
      const userTypes = await userService.getUserTypes()
      if (!userTypes) {
        return serverErrorResponse(res, responses.ORDER_CREATED);
      }
  
      return successResponse(res, {userTypes: userTypes});
    } catch (error) {
      next(error)
    }
  };

export const getAllComplaintStatus: RequestHandler = async (req, res, next) => {
    try {
      const statuses = await userService.getAllComplaintStatus()
      if (!statuses) {
        return serverErrorResponse(res, responses.ORDER_CREATED);
      }
  
      return successResponse(res, {statuses: statuses});
    } catch (error) {
      next(error)
    }
  };

  export const getComplaintTypes: RequestHandler = async (req, res, next) => {
    try {
       const complaintType = await userService.getComplaintTypes()
       if (!complaintType) {
         return serverErrorResponse(res, responses.ORDER_NOT_FOUND);
       }
   
       return successResponse(res, {complaintType});
     } catch (error) {
       next(error)
    }
   };

  export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
      const { user_department_id } = req.query
      console.log("user_department_id == > ", typeof user_department_id)
      const users = await userService.getAllUsers(user_department_id)
      if (!users) {
        return serverErrorResponse(res, responses.ORDER_CREATED);
      }
  
      return successResponse(res, {users});
    } catch (error) {
      next(error)
    }
  }

  export const deleteUser: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.query
      console.log("user_department_id == > ", typeof id)
      const users = await userService.deleteUser(id)
      if (!users) {
        return serverErrorResponse(res, responses.ORDER_CREATED);
      }
  
      return successResponse(res, {users});
    } catch (error) {
      next(error)
    }
  }

  const userController = {
    getAllComplaintStatus,
    getUsersByDepartment,
    getUserTypes,
    getComplaintTypes,
    getAllUsers,
    deleteUser
}

export default userController

