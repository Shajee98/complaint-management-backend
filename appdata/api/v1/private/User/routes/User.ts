import { Router } from 'express';
import userController from "../controllers/User"

const complaintRouter = Router();


complaintRouter.get(
  "/get/all",
  userController.getUsersByDepartment
)

export default complaintRouter
