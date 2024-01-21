import { Router } from 'express';
import userController from "../../controllers/User"

const userRouter = Router();

userRouter.delete(
  "/delete",
  userController.deleteUser
)

export default userRouter
