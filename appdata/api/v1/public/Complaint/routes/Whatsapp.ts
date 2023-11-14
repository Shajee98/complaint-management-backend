const whatsappRouter = require("express").Router()
import whatsappController from "../controllers/Whatsapp"

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

export default whatsappRouter
