import { Request, Response } from "express";
import { IUserReqData } from "../../../interfaces/user/IUserReqData";
import Admin from "../../../models/adminModel";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as IUserReqData;
    const user = await User.findByCredentials(email, password);

    if (!user.isActive && user.adminNote) {
      const errorMessage = user.createInactiveMessage('Banned');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const token = await user.generateAuthToken();

    if (user.adminKey) {
      const admin = Admin.findOne({ userId: user._id, adminKey: user.adminKey });

      if (!admin) {
        user.isAdmin = false;
      } else {
        user.isAdmin = true;
      }

      await user.save();
    }

    if (user.isAdmin && !user.adminKey) {
      user.isAdmin = false;
      await user.save();
    }

    const userResponseData = {
      _id: user._id,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      avatarUrl: user.avatarUrl,
      adminNote: user.adminNote
    }

    res.status(200).send({ userResponseData, token });

  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Login failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userLogin;