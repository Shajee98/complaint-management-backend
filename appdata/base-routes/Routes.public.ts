import express from "express"
// const customerRoutes = require("../api/v1/public/Customer/routes/Auth")
// const customerSessionRoutes = require("../api/v1/public/Customer/routes/Session")
// const productRoutes = require("../api/v1/public/Product/routes/Product")
// const categoryRoutes = require("../api/v1/public/Category/routes/Category")
// const shippingAddressRoutes = require("../api/v1/public/ShippingAddress/routes/ShippingAddress")
// const ethRoutes = require("../api/v1/public/Ethereum/routes/Ethereum")
import adminSessionRoutes from '../api/v1/public/Admin/routes/Session'
import adminAuthRouter from "../api/v1/public/Admin/routes/Auth"
// const paymentMethodTypesRoutes = require("../api/v1/public/PaymentMethodType/routes/PaymentMethodType")
// const orderWebhookRoutes = require("../api/v1/public/webhooks/routes/Order")
// const newsLetterSubscriberRoutes = require("../api/v1/public/NewsletterSubscriber/routes/NewsletterSubscriber")
// const ppRouter = require("../api/v1/public/PropserPoints/routes/ProsperPoints")
// const orderPublicRouter = require("../api/v1/public/Order/routes/Order")
import departmentRoutes from "../api/v1/private/Departments/routes/Departments"
import complaintRouter from "../api/v1/private/Complaints/routes/Complaints"

const publicRouter = express.Router()
publicRouter.use('/v1/session', adminSessionRoutes)
publicRouter.use('/v1/auth', adminAuthRouter)
publicRouter.use("/v1/departments/", departmentRoutes)
publicRouter.use('/v1/complaints', complaintRouter)
// router.use("/v1/customer", customerRoutes)
// router.use("/v1/customer/session", customerSessionRoutes)
// router.use("/v1/product", productRoutes)
// router.use("/v1/category", categoryRoutes)
// router.use("/v1/shipping-address", shippingAddressRoutes)
// router.use("/v1/ethereum", ethRoutes)
// router.use("/vi/propser-points", ppRouter)
// router.use("/v1/payment-method-types", paymentMethodTypesRoutes)
// router.use("/v1/webhooks/order", orderWebhookRoutes)
// router.use("/v1/newsletter/subscribers", newsLetterSubscriberRoutes)
// router.use("/v1/webhooks/", orderPublicRouter)

export default publicRouter