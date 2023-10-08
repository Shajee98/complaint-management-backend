import { Router } from 'express';
import departmentController from "../controllers/Departments"

const complaintRouter = Router();

complaintRouter.get(
  "/get/all",
  departmentController.getAllDepartments
)

export default complaintRouter
