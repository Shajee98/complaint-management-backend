import MessageStatus from "../../models/MessageStatus";

export const whatsappMessageStatus = async (complaintDetails: any) => {
    try {
      let complaint: any
      const { customer_number, message_status, service_end_date } = complaintDetails
          complaint = await MessageStatus.create({
            customerNumber: customer_number,
            messageStatus: message_status,
            serviceEndDate: service_end_date
          })
  
      return complaint
    } catch (error) {
      throw error
    }
  };

const whatsappService = {
    whatsappMessageStatus
}

export default whatsappService