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

// export const getAllStaffs: RequestHandler = async (req, res, next) => {
//     try {
//         console.log("hellooooooooooo ===> ", req.params.id)
//         const { id } = req.params
//         const staffs = await departmentService.getAllStaffs(Number(id))
//         if (!staffs) {
//           return serverErrorResponse(res, responses.ORDER_CREATED);
//         }
    
//         return successResponse(res, {staffs: staffs});
//       } catch (error) {
//         next(error)
//       }
// }

  const departmentController = {
    getAllDepartments,
    // getAllStaffs
}

export default departmentController

