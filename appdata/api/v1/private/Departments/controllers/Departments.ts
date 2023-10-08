import departmentService from "../../../../../../services/department/Department"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { serverErrorResponse, successResponse } from "../../../../../../services/Response/Response";

export const getAllDepartments: RequestHandler = async (req, res, next) => {
    try {
      const departments = await departmentService.getAllDepartments()
      if (!departments) {
        return serverErrorResponse(res, responses.ORDER_CREATED);
      }
  
      return successResponse(res, {departments: departments});
    } catch (error) {
      next(error)
    }
  };

  const departmentController = {
    getAllDepartments
}

export default departmentController

