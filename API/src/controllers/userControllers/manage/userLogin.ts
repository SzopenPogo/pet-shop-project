import { Request, Response } from "express";
import { IUserReqData } from "../../../interfaces/user/IUserReqData";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as IUserReqData;
    const user = await User.findByCredentials(email, password);

    if (!user.isActive) {
      const errorMessage = user.createInactiveMessage();
      return res.status(errorMessage.status).send(errorMessage);
    }

    const token = await user.generateAuthToken();

    if (user.adminKey) {
      // TODO: Check admin key !!!
      user.isAdmin = true;
    }

    const userResponseData = {
      _id: user._id,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      avatarUrl: user.avatarUrl
    }

    res.status(200).send({ userResponseData, token });

  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Login failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userLogin;