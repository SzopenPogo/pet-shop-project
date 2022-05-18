import { Response } from "express";
import { IMatchObject } from "../../../interfaces/other/IMatch";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import User from "../../../models/userModel";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userGetAll = async (req: IAuthRequest, res: Response) => {
  try {
    const match: IMatchObject = {};
    
    if (req.query.isActive) {
      match.isActive = req.query.isActive === 'true';
    }
    if (req.query.isAdmin) {
      match.isAdmin = req.query.isAdmin === 'true';
    }
    if (req.query.searchingEmail) {
      match.email = {
        $regex: req.query.searchingEmail,
        $options: 'i'
      };
    }


    const users = await User.find(match)
      .sort({ isAdmin: -1 })
      .limit(req.query.limit ? +req.query.limit : 10)
      .skip(req.query.skip ? +req.query.skip : 0);
    
    res.status(200).send(users);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get all users failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userGetAll;