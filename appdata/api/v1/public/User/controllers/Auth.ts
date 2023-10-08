import authService from "../../../../../../services/User/User";
import responses from "../../../../../../constants/Responses";
import {
  genericResponseByData,
  serverErrorResponse,
  successResponse,
} from "../../../../../../services/Response/Response";
import { NextFunction, Request, Response } from "express";

// Gets required info from request and calls service to create new user record
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, password, user_name, user_type_id } = req.body;
    const createdUser = await authService.register({
      first_name: firstname,
      last_name: lastname,
      user_name: user_name,
      password: password,
      user_type_id: user_type_id,
    });

    if (!createdUser) {
      serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE);
    }

    return res.send(
      genericResponseByData(createdUser, {
        success: responses.ADMIN_REGISTRATION_SUCCESS,
      })
    );
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    // update user password
    const passwordUpdated = await authService.updatePassword(
      password,
      Number(userId)
    );

    if (!passwordUpdated) {
      serverErrorResponse(res, responses.NOT_UPDATED);
      return;
    }

    const responseData = { passwordReset: true };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  resetPassword,
};
