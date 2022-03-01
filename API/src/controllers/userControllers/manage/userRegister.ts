import { Request, Response } from "express";
import { IUserReqData } from "../../../interfaces/user/IUserReqData";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as IUserReqData;
    const user = new User(userData);
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'User registration failed', error);

    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userRegister;