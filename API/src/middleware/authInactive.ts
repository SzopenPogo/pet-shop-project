import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { NextFunction, Response } from "express";
import { TOKEN_SECRET } from "../constants/user/token";
import { createErrorMessage } from "../utils/messages/createErrorMessage";
import { ITokenDecoded } from "../interfaces/user/IToken";
import { IAuthRequest } from "../interfaces/user/IUserAuthRequest";

const authInactive = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.header('Authorization');
    
    const token = header!.split(' ')[1];
    const decoded = jwt.verify(token, TOKEN_SECRET) as ITokenDecoded;
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    const errorMessage = createErrorMessage(401, 'Unauthorized Inactive', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default authInactive