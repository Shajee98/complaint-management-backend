import complaintService from "../../../../../../services/complaints/Complaints"
import responses from "../../../../../../constants/Responses"
import { RequestHandler } from "express";
import { genericResponseByData, serverErrorResponse, successResponse } from "../../../../../../services/Response/Response";

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
