import express from "express"
// const customerRoutes = require("../api/v1/public/Customer/routes/Auth")
// const customerSessionRoutes = require("../api/v1/public/Customer/routes/Session")
// const productRoutes = require("../api/v1/public/Product/routes/Product")
// const categoryRoutes = require("../api/v1/public/Category/routes/Category")
// const shippingAddressRoutes = require("../api/v1/public/ShippingAddress/routes/ShippingAddress")
// const ethRoutes = require("../api/v1/public/Ethereum/routes/Ethereum")
import userSessionRoutes from '../api/v1/public/User/routes/Session'
import userAuthRouter from "../api/v1/public/User/routes/Auth"
import adminAuthRouter from "../api/v1/public/Admin/routes/Auth"
import departmentRoutes from "../api/v1/private/Departments/routes/Departments"
import userRouter from "../api/v1/private/User/routes/User"
import whatsappRouter from "../api/v1/public/Complaint/routes/Whatsapp"


const publicRouter = express.Router()
publicRouter.use('/v1/session', userSessionRoutes)
publicRouter.use('/v1/admin/auth', adminAuthRouter)
publicRouter.use('/v1/user/auth', userAuthRouter)
publicRouter.use("/v1/departments/", departmentRoutes)
publicRouter.use('/v1/users/', userRouter)
publicRouter.use('/v1/whatsapp/', whatsappRouter)

export default publicRouter