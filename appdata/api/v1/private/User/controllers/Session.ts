import responses from "../../../../../../constants/Responses"
import { successResponse } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"

export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.signedCookies
      console.log("refreshToken => " + token)
  
      res.clearCookie("token")
      return successResponse(res, {message: responses.LOG_OUT})
    } catch (error) {
      next(error)
    }
  }

export default {
    logout
}