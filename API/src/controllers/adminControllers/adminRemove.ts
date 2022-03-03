import { Response } from "express";
import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";
import bcryptjs from 'bcryptjs';
import User from "../../models/userModel";
import Admin from "../../models/adminModel";
import { MAX_ADMIN_LEVEL } from "../../constants/admin/admin";

const adminRemove = async (req: IAuthRequest, res: Response) => {
  try {
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

    const removeAdmin = await Admin.deleteAdmin(user);

    res.status(removeAdmin.status).send(removeAdmin);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Remove admin failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default adminRemove;