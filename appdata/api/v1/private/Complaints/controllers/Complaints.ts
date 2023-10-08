import complaintService from "../../../../../../services/complaints/Complaints"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { serverErrorResponse, successResponse } from "../../../../../../services/Response/Response";

export const createComplaint: RequestHandler = async (req, res, next) => {
  try {
    const { customer_number, complaint_number, description, staff_id, department_id, status_id, attachments } = req.body
    const complaint = await complaintService.createComplaint({customer_number, complaint_number, description, staff_id, department_id, status_id, attachments})
    if (!complaint) {
      return serverErrorResponse(res, responses.ORDER_NOT_CREATED);
    }

    return successResponse(res, {complaint});
  } catch (error) {
    next(error)
  }
};

export const updateComplaint: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    const complaint = await complaintService.updateComplaint(Number(id), {...req.body})
    if (!complaint) {
      return serverErrorResponse(res, responses.ORDER_CREATED);
    }

    return successResponse(res, {complaint});
  } catch (error) {
    next(error)
  }
};

export const getAllComplaints: RequestHandler = async (req, res, next) => {
  try {
    const { offset } = req.body
    const id = req.user?.id
    const complaints = await complaintService.getAllComplaints(id, offset)
    if (!complaints) {
      return serverErrorResponse(res, responses.ORDER_CREATED);
    }

    return successResponse(res, {complaints});
  } catch (error) {
    next(error)
  }
};

export const getAllComplaintStatus: RequestHandler = async (req, res, next) => {
  try {
    const { offset } = req.body
    const id = req.user?.id
    const complaints = await complaintService.getAllComplaintStatus()
    if (!complaints) {
      return serverErrorResponse(res, responses.ORDER_CREATED);
    }

    return successResponse(res, {complaints});
  } catch (error) {
    next(error)
  }
};

export const getComplaintById: RequestHandler = async (req, res, next) => {
 try {
    const { id } = req.params
    const complaint = await complaintService.getComplaintById(Number(id))
    if (!complaint) {
      return serverErrorResponse(res, responses.ORDER_NOT_FOUND);
    }

    return successResponse(res, {complaint});
  } catch (error) {
    next(error)
 }
};

const getComplaintsByMonth: RequestHandler = async (req, res, next) => {
  try {
    const { status_id } = req.body;
    const complaints = await complaintService.getComplaintsByMonths(1, status_id);
    const responseData = { ...complaints };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

export const addCommentToComplaint: RequestHandler = async (req, res, next) => {
  try {
     const { complaint_id, user_id, comment } = req.body
     const complaint = await complaintService.addCommentToComplaint(Number(complaint_id), Number(user_id), comment)
     if (!complaint) {
       return serverErrorResponse(res, responses.ORDER_NOT_FOUND);
     }
 
     return successResponse(res, {complaint});
   } catch (error) {
     next(error)
  }
 };

const complaintController = {
    createComplaint,
    updateComplaint,
    getAllComplaints,
    getComplaintById,
    getAllComplaintStatus,
    getComplaintsByMonth
}

export default complaintController
