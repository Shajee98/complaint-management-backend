import complaintService from "../../../../../../services/complaints/Complaints"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { genericResponseByData, serverErrorResponse, successResponse } from "../../../../../../services/Response/Response";
import Attachment from "../../../../../../models/Attahcment";

const YesOrNo: RequestHandler = async (req, res, next) => {
    try {
        const { response, customerNumber } = req.body
            const response_saved = await complaintService.YesOrNo(response, customerNumber)
  
            if (!response_saved)
            {
              return serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE)
            }
        
            return res.send(genericResponseByData(response_saved, { success: responses.ADMIN_REGISTRATION_SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const YesOrNoCount: RequestHandler = async (req, res, next) => {
    try {
            const response_counts = await complaintService.YesOrNoCount()
  
            if (!response_counts)
            {
              return serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE)
            }
        
            return res.send(genericResponseByData(response_counts, { success: responses.ADMIN_REGISTRATION_SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const DescResponse: RequestHandler = async (req, res, next) => {
  try {
    console.log("req...", req.body);
    const { customer_number, complaint_number, description, staff_id, department_id, complaint_status_id, complaint_type_id, fromWhatsapp } = req.body
    console.log("customer_number ", customer_number, "complaint_number ", complaint_number, "description ", description, staff_id, "department_id ", department_id, "complaint_status_id", complaint_status_id)
    const whatsapp_complaint = await complaintService.createComplaint({customer_number, complaint_number, description, staff_id, department_id, complaint_status_id, complaint_type_id, fromWhatsapp})
    if (!whatsapp_complaint) {
      return serverErrorResponse(res, responses.ORDER_NOT_CREATED);
    }

    if (req.files)
    {
      let files: any = req.files
      await Promise.all(files.map(async (file: any) => {
        console.log("file ====> ", file)
        await Attachment.create({
          fileName: file.originalname,
          complaintId: whatsapp_complaint.id
        })
      }));
    }

    return successResponse(res, {whatsapp_complaint});
  } catch (error) {
    next(error)
  }
}

const SetWhatsappMessageFormat: RequestHandler = async (req, res, next) => {
    try {
        const { message } = req.body
            const response_saved = await complaintService.SetWhatsappMessageFormat(message)
  
            if (!response_saved)
            {
              return serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE)
            }
        
            return res.send(genericResponseByData(response_saved, { success: responses.ADMIN_REGISTRATION_SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const WhatsappMessage: RequestHandler = async (req, res, next) => {
    try {
            const format = await complaintService.WhatsappMessageFormat()
  
            if (!format)
            {
              return serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE)
            }
        
            return res.send(genericResponseByData(format, { success: responses.ADMIN_REGISTRATION_SUCCESS }));
      } catch (error) {
        next(error)
      }
}

const whatsappController = {
    YesOrNo,
    DescResponse,
    YesOrNoCount,
    WhatsappMessage,
    SetWhatsappMessageFormat
} 

export default whatsappController
