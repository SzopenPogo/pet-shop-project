import { Response } from "express";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userGetById = async (req: IAuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get user by ID failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userGetById;