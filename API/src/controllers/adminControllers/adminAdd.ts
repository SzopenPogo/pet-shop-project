import { IAuthRequest } from "../../interfaces/user/IUserAuthRequest";
import { Response } from "express";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";
import User from "../../models/userModel";
import Admin from "../../models/adminModel";
import { generateAdminKey } from "../../utils/admin/generateAdminKey";
import bcryptjs from 'bcryptjs';
import { MAX_ADMIN_LEVEL } from "../../constants/admin/admin";

const adminAdd = async (req: IAuthRequest, res: Response) => {
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

    if (!user.isActive) {
      const errorMessage = createErrorMessage(400, 'User is inactive');
      return res.status(errorMessage.status).send(errorMessage);
    }

    if (user.adminKey) {
      const userAdminData = await user.populate('adminRef');

      if (userAdminData.adminRef && userAdminData.adminRef.length > 0) {
        if (user.adminRef![0].adminKey) {
          const errorMessage = createErrorMessage(400, 'This user is an admin');
          return res.status(errorMessage.status).send(errorMessage);
        }
      }
    }

    const newAdmin = new Admin({
      userId: user._id,
      adminKey: generateAdminKey(admin._id, user._id),
      adminLevel: 0
    });

    user.adminKey = newAdmin.adminKey;
    user.isAdmin = true;

    await user.save();
    await newAdmin.save();

    res.status(201).send(newAdmin);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Add admin failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default adminAdd;