import { Router } from 'express';
import complaintsController from "../controllers/Complaints"

const complaintRouter = Router();


complaintRouter.post(
  "/create",
  complaintsController.createComplaint
)

complaintRouter.put(
  "/update-complaint/:id",
  complaintsController.updateComplaint
)

complaintRouter.get(
  "/get/all",
  complaintsController.getAllComplaints
)

complaintRouter.get(
  "/month/get/all",
  complaintsController.getComplaintsByMonth
)

complaintRouter.get(
  "/statuses/get/all",
  complaintsController.getAllComplaintStatus
)

complaintRouter.get(
  "/get/:id",
  complaintsController.getComplaintById
)

export default complaintRouter
