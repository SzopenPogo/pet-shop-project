import mongoose from "mongoose";
import { IAdmin, IAdminStatics } from "../interfaces/admin/IAdmin";
import { IUser } from "../interfaces/user/IUser";
import { createErrorMessage } from "../utils/messages/createErrorMessage";
import { createInfoMessage } from "../utils/messages/createInfoMessage";

const adminSchema = new mongoose.Schema<IAdmin, IAdminStatics>({
  adminKey: {
    type: String,
    trim: true,
    required: true
  },

  adminLevel: {
    type: Number,
    default: 0,
    min: 0,
    max: 3,
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

//STATICS
//deleteAdmin
adminSchema.statics.deleteAdmin = async (user: IUser) => {

  const notAnAdminMessage = 'User is not an admin';

  if (!user.adminKey) {
    const errorMessage = createErrorMessage(400, notAnAdminMessage);
    return (errorMessage);
  }

  const userAdminData = await user.populate('adminRef');
  if (userAdminData.adminRef && userAdminData.adminRef.length > 0) {
    if (!user.adminRef![0].adminKey) {
      user.adminKey = '';
      await user.save();

      const errorMessage = createErrorMessage(400, notAnAdminMessage);
      return errorMessage;
    }
  }

  const adminRemoveData = await Admin.deleteMany({ userId: user._id, adminKey: user.adminKey });

  if (!adminRemoveData) {
    const errorMessage = createErrorMessage(404, 'Admin not found');
    return errorMessage;
  }

  user.adminKey = '';
  user.isAdmin = false;
  await user.save();

  const infoMessage = createInfoMessage(200, `Admin ${user.email} removed.`)
  return infoMessage;
}

const Admin = mongoose.model<IAdmin, IAdminStatics>('Admin', adminSchema);
export default Admin;