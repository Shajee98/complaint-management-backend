const whatsappRouter = require("express").Router()
import whatsappController from "../controllers/Whatsapp"
import complaintsController from "../../../private/Complaints/controllers/Complaints"

whatsappRouter.get(
  "/get/all",
  complaintsController.getAllComplaintswoUser
)

whatsappRouter.post(
  "/update-complaint/:id",
  complaintsController.updateComplaint
)

whatsappRouter.post(
  "/yes-or-no-whatsapp-response",
  whatsappController.YesOrNo
)

whatsappRouter.get(
  "/YesOrNoCount",
  whatsappController.YesOrNoCount
)

whatsappRouter.post(
  "/desc-whatsapp-response",
  whatsappController.DescResponse
)

whatsappRouter.get(
  "/get/whatsapp-message",
  whatsappController.WhatsappMessage
)

whatsappRouter.post(
  "/set/whatsapp-message",
  whatsappController.SetWhatsappMessageFormat
)

whatsappRouter.post(
  "/set/message-status",
  whatsappController.MessageStatus
)

whatsappRouter.get(
  "/message-status/get/all",
  whatsappController.getAllMessagesStatus
)

export default whatsappRouter
