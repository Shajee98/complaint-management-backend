const whatsappRouter = require("express").Router()
import whatsappController from "../controllers/Whatsapp"

whatsappRouter.post(
  "/yes-or-no-whatsapp-response",
  whatsappController.YesOrNo
)

whatsappRouter.post(
  "/desc-whatsapp-response",
  whatsappController.DescResponse
)

whatsappRouter.post(
  "/set/message-status",
  whatsappController.MessageStatus
)

export default whatsappRouter
