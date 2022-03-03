import { NextFunction, Request, Response } from "express";
import { IAuthRequest } from "../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../utils/messages/createErrorMessage";

const authAdmin = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    if (!req.user.adminKey) {
      if (req.user.isAdmin) {
        req.user.isAdmin = false;
        await req.user.save();
      }

      throw new Error('User is not a Admin');
    }

    if (!req.user.isAdmin) {
      req.user.isAdmin = true;
      await req.user.save();
    }

    req.user = await req.user.populate('adminRef');

    next();
  } catch (error) {
    const errorMessage = createErrorMessage(401, 'Acces only for admin', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default authAdmin;