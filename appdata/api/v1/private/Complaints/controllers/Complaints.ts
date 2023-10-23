import complaintService from "../../../../../../services/complaints/Complaints"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { serverErrorResponse, successResponse } from "../../../../../../services/Response/Response";
import Attachment from "../../../../../../models/Attahcment";

export const createComplaint: RequestHandler = async (req, res, next) => {
  try {
    console.log("req...", req.body);
    const { customer_number, complaint_number, description, staff_id, department_id, complaint_status_id } = req.body
    console.log("customer_number ", customer_number, "complaint_number ", complaint_number, "description ", description, staff_id, "department_id ", department_id, "complaint_status_id", complaint_status_id)
    const complaint = await complaintService.createComplaint({customer_number, complaint_number, description, staff_id, department_id, complaint_status_id})
    if (!complaint) {
      return serverErrorResponse(res, responses.ORDER_NOT_CREATED);
    }

    if (req.files)
    {
      let files: any = req.files
      await Promise.all(files.map(async (file: any) => {
        console.log("file ====> ", file)
        await Attachment.create({
          fileName: file.originalname,
          complaintId: complaint.id
        })
      }));
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
    const { department_id, complaint_type_id } = req.query
    const user = req.user
    const complaints = await complaintService.getAllComplaints(Number(department_id), Number(complaint_type_id), user)
    if (!complaints) {
      return serverErrorResponse(res, responses.ORDER_CREATED);
    }

    return successResponse(res, {complaints});
  } catch (error) {
    next(error)
  }
};

export const getAllSearchByKeyword: RequestHandler = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const complaints = await complaintService.getAllSearchByKeyword(String(keyword));
    const responseData = complaints;
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
}

export const getAllComplaintStatus: RequestHandler = async (req, res, next) => {
  try {
    const statuses = await complaintService.getAllComplaintStatus()
    if (!statuses) {
      return serverErrorResponse(res, responses.ORDER_CREATED);
    }

    return successResponse(res, {statuses: statuses});
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
    const { status_id } = req.query;
    const id = req.user?.id
    const complaints = await complaintService.getComplaintsByMonths(Number(id), Number(status_id));
    const responseData = { ...complaints };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

export const getComments: RequestHandler = async (req, res, next) => {
  try {
    const { complaint_id } = req.query
    const comments = await complaintService.getComments(Number(complaint_id))
     if (!comments) {
       return serverErrorResponse(res, responses.ORDER_NOT_FOUND);
     }
 
     return successResponse(res, {comments});
  } catch (error) {
    next(error)
  }
}

export const addCommentToComplaint: RequestHandler = async (req, res, next) => {
  try {
    const id = req.user?.id
     const { complaint_id, comment } = req.body
     const complaint = await complaintService.addCommentToComplaint(Number(complaint_id), Number(id), comment)
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
    getComments,
    getAllComplaintStatus,
    getComplaintsByMonth,
    addCommentToComplaint,
    getAllSearchByKeyword
}

export default complaintController
