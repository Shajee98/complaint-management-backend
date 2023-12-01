import MessageStatus from "../../models/MessageStatus";

export const whatsappMessageStatus = async (newRecords: any) => {
    try {
      const prevRecords = await MessageStatus.findAll()
      console.log("prevRecords ===> ", prevRecords)
      if (prevRecords.length == 0)
      {
        const allNewRecords = await MessageStatus.bulkCreate(newRecords)
        return allNewRecords
      }
      const fitlteredRecords: any[] = []
      for (const newRecord of newRecords)
      {
        for (const prevRecord of prevRecords)
        {
            if (newRecord.customerNumber == prevRecord.dataValues.customerNumber)
            {
                console.log("found a match!")
                await MessageStatus.update({
                    customerNumber: prevRecord.dataValues.customerNumber,
                    serviceEndDate: prevRecord.dataValues.serviceEndDate,
                    customerName: prevRecord.dataValues.customerName,
                    messageStatus: newRecord.messageStatus
                }, {
                    where: {
                        customerNumber: prevRecord.dataValues.customerNumber 
                    }
                })
                break
            }
        }
        if (!prevRecords.some((record) => record.dataValues.customerNumber == newRecord.customerNumber)) {
            fitlteredRecords.push(newRecord)
        }
      }
      console.log("fitlteredRecords ==== > ", fitlteredRecords)
      await MessageStatus.bulkCreate(fitlteredRecords)
  
      return fitlteredRecords
    } catch (error) {
      throw error
    }
  };

export const getAllMessagesStatus = async () => {
    try {
      const statuses = await MessageStatus.findAll();
      
      return statuses;
    } catch (error) {
      console.error(error);
    }
  };

const whatsappService = {
    whatsappMessageStatus,
    getAllMessagesStatus
}

export default whatsappService