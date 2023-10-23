import express from "express"
import userSessionRoutes from "../api/v1/private/User/routes/Session"
import complaintsRoutes from "../api/v1/private/Complaints/routes/Complaints"
// import departmentRoutes from "../api/v1/private/Departments/routes/Departments"
import userRouter from "../api/v1/private/User/routes/User"


const privateRouter = express.Router()

privateRouter.use("/v1/users/session/", userSessionRoutes)
privateRouter.use("/v1/complaints/", complaintsRoutes)
// privateRouter.use("/v1/departments/", departmentRoutes)
// privateRouter.use('/v1/users/', userRouter)

export default privateRouter
