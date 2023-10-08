import userService from "../../../../../../services/User/User"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { serverErrorResponse, successResponse } from "../../../../../../services/Response/Response";

export const getUsersByDepartment: RequestHandler = async (req, res, next) => {
    try {
      const { department_id } = req.body
      const id = req.user?.id
      const complaints = await userService.getUsersByDepartment(Number(department_id))
      if (!complaints) {
        return serverErrorResponse(res, responses.ORDER_CREATED);
      }
  
      return successResponse(res, {complaints});
    } catch (error) {
      next(error)
    }
  };

  const userController = {
    getUsersByDepartment
}

export default userController

