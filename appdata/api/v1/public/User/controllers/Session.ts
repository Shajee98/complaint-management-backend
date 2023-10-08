import responses from "../../../../../../constants/Responses";
import { getJwt, COOKIE_OPTIONS } from "../../../../../../utils/auth.utils";
import { successResponse } from "../../../../../../services/Response/Response";

import jwt from 'jsonwebtoken';
import { RequestHandler } from "express";
import { getUserById } from "../../../../../../services/User/User";

const login: RequestHandler = async (req, res, next) => {
  try {
    
    // Remove users password from memory
    req.user!.password = undefined
    console.log("req.user after logging in => ", req.user)
    const jwtToken = getJwt({
      id: req.user!.id,
      email: req.user!.user_name,
      user_type: req.user!.user_role_id
    })

    const admin = await getUserById(req.user?.id)

    const responseData = {
      jwtToken: jwtToken,
      user: { ...admin }
    }

    res.cookie("refreshToken", jwtToken, COOKIE_OPTIONS)
    successResponse(res, responseData)
    return
  } catch (error) {
    next(error)
  }
}

export default {
  login,
};
