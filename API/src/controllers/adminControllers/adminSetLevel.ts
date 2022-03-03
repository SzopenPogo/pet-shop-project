import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import User from "../../models/userModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";
import bcryptjs from 'bcryptjs';
import { MAX_ADMIN_LEVEL } from "../../constants/admin/admin";

const adminSetLevel = async (req: IAuthRequest, res: Response) => {
  try {
    if (+req.body.adminLevel < 0 || +req.body.adminLevel > 3) {
      const errorMessage = createErrorMessage(400, 'Range of admin level is (0-3)');
      return res.status(errorMessage.status).send(errorMessage);
    }


    const admin = req.user;

    if (!admin) {
      const errorMessage = createErrorMessage(404, 'Admin not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const isPasswordValid = await bcryptjs.compare(req.body.currentPassword, admin.password);

    if (!isPasswordValid) {
      const errorMessage = createErrorMessage(400, 'Invalid current password');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const adminData = admin.adminRef;
    
    if (adminData![0].adminLevel < MAX_ADMIN_LEVEL) {
      const errorMessage = createErrorMessage(401, 'Higher admin level required');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      const errorMessage = createErrorMessage(404, 'User not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    if (!user.isActive) {
      const errorMessage = createErrorMessage(400, 'User is inactive');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const notAnAdminMessage = 'User is not an admin';

    if (!user.adminKey) {
      const errorMessage = createErrorMessage(400, notAnAdminMessage);
      return res.status(errorMessage.status).send(errorMessage);
    }

    const userAdminData = await user.populate('adminRef');

    if (userAdminData.adminRef && userAdminData.adminRef.length > 0) {
      if (!user.adminRef![0].adminKey) {
        user.adminKey = '';
        await user.save();

        const errorMessage = createErrorMessage(400, notAnAdminMessage);
        return res.status(errorMessage.status).send(errorMessage);
      }
    }

    userAdminData.adminRef![0].adminLevel = +req.body.adminLevel;
    await userAdminData.adminRef![0].save();
    
    res.status(200).send(userAdminData);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Set admin level failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default adminSetLevel