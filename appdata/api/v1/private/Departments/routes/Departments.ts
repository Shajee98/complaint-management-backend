import { Router } from 'express';
import departmentController from "../controllers/Departments"

const departmentRouter = Router();

departmentRouter.get(
  "/get/all",
  departmentController.getAllDepartments
)

// departmentRouter.get(
//     "/staffs/get/all/:id",
//     departmentController.getAllStaffs
//   )

export default departmentRouter
