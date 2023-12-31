import { Router } from 'express';
import complaintsController from "../controllers/Complaints"
import { attachmentUpload } from '../../../../../../utils/upload';

const complaintRouter = Router();


complaintRouter.post(
  "/create",
  attachmentUpload.array('attachments'),
  complaintsController.createComplaint
)

complaintRouter.post(
  "/update-complaint/:id",
  attachmentUpload.array('attachments'),
  complaintsController.updateComplaint
)

complaintRouter.get(
  "/get/all",
  complaintsController.getAllComplaints
)

complaintRouter.get(
  "/search/get/all",
  complaintsController.getAllSearchByKeyword
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

complaintRouter.get(
  "/comments/get/all",
  complaintsController.getComments
)

complaintRouter.post(
  "/comments/add",
  complaintsController.addCommentToComplaint
)

export default complaintRouter
