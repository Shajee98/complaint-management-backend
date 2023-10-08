import responses from "../../../../../../constants/Responses"
import jwt from "jsonwebtoken"
import { getJwt, COOKIE_OPTIONS } from "../../../../../..//utils/auth.utils"
import { serverErrorResponse, successResponse, badRequestResponse, unauthorizedResponse } from "../../../../../../services/Response/Response"
import { NextFunction, Request, Response } from "express"

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { signedCookies = {} } = req
      const { refreshToken } = signedCookies
      console.log("refreshToken => " + refreshToken)
  
      res.clearCookie("refreshToken", COOKIE_OPTIONS)
      badRequestResponse(res, responses.INVALID_COOKIE)
      return
    } catch (error) {
      next(error)
    }
  }

export default {
    logout
}