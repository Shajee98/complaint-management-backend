const whatsappRouter = require("express").Router()
import whatsappController from "../../controllers/Whatsapp"

whatsappRouter.get(
  "/YesOrNoCount",
  whatsappController.YesOrNoCount
)

whatsappRouter.get(
  "/get/whatsapp-message",
  whatsappController.WhatsappMessage
)

whatsappRouter.post(
  "/set/whatsapp-message",
  whatsappController.SetWhatsappMessageFormat
)

whatsappRouter.get(
  "/message-status/get/all",
  whatsappController.getAllMessagesStatus
)

export default whatsappRouter
