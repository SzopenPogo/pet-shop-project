import { Request, Response } from "express";
import { PRODUCT_DIR, PRODUCT_IMG_QUALITY, PRODUCT_IMG_SIZE } from "../../constants/images/productImages";
import { IImageFile } from "../../interfaces/other/IImageFile";
import Product from "../../models/productModel";
import saveUploadedImage from "../../utils/images/saveUploadedImage";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const productCreate = async (req: Request, res: Response) => {
  try {
    const savedImages: Array<string> = [];

    if (req.files) {
      const uploadedImages = req.files as Array<IImageFile>;

      for (let i = 0; i < uploadedImages.length; i++) {
        const savedImageUrl = await saveUploadedImage(
          PRODUCT_DIR,
          uploadedImages[i],
          PRODUCT_IMG_SIZE,
          PRODUCT_IMG_QUALITY
        )

        savedImages.push(savedImageUrl!);
      }
    }

    const product = new Product({
      ...req.body,
      images: savedImages
    });


    
    await product.save();

    res.status(201).send(product);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Create product failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default productCreate;