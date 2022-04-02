import { Response } from "express";
import { USER_DIR, USER_IMG_QUALITY, USER_IMG_SIZE } from "../../../constants/images/userImage";
import { IImageFile } from "../../../interfaces/other/IImageFile";
import { IAuthRequest } from "../../../interfaces/user/IUserAuthRequest";
import deleteImageFS from "../../../utils/images/deleteImageFS";
import saveUploadedImage from "../../../utils/images/saveUploadedImage";
import { createErrorMessage } from "../../../utils/messages/createErrorMessage";

const userChangeAvatar = async (req: IAuthRequest, res: Response) => {
  try {
    if (!req.user) {
      const errorMessage = createErrorMessage(404, 'User not fonund');
      return res.status(errorMessage.status).send(errorMessage);
    }

    if (!req.file) {
      const errorMessage = createErrorMessage(400, 'Image is required');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const uploadedImage = req.file as IImageFile;

    const savedImageUrl = await saveUploadedImage(
      USER_DIR,
      uploadedImage,
      USER_IMG_SIZE,
      USER_IMG_QUALITY
    )
    
    if (!savedImageUrl) {
      const errorMessage = createErrorMessage(409, 'Upload Image failed');
      return res.status(errorMessage.status).send(errorMessage);
    }

    if (req.user.avatarUrl) {
      deleteImageFS(req.user.avatarUrl);
    }

    req.user.avatarUrl = savedImageUrl;
    await req.user.save();
    res.status(200).send(req.user.avatarUrl);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Avatar change failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default userChangeAvatar;