import express from "express"
import userSessionRoutes from "../api/v1/private/User/routes/Session"
import complaintsRoutes from "../api/v1/private/Complaints/routes/Complaints"
import userRouter from "../api/v1/private/User/routes/private/User"
import settingsRoutes from "../api/v1/private/Settings/routes/Settings"
import whatsappRouter from "../api/v1/public/Complaint/routes/private/Whatsapp"


const privateRouter = express.Router()

privateRouter.use("/v1/users/session/", userSessionRoutes)
privateRouter.use("/v1/complaints/", complaintsRoutes)
privateRouter.use("/v1/settings/", settingsRoutes)
privateRouter.use('/v1/private/whatsapp/', whatsappRouter)
privateRouter.use('/v1/private/users/', userRouter)

export default privateRouter
