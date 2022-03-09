import { Request, Response } from "express";
import { PRODUCT_DIR, PRODUCT_IMG_QUALITY, PRODUCT_IMG_SIZE } from "../../constants/images/productImages";
import { IImageFile } from "../../interfaces/other/IImageFile";
import Product from "../../models/productModel";
import saveUploadedImage from "../../utils/images/saveUploadedImage";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const productEdit = async (req: Request, res: Response) => {
  try {
    const allowedUpdates = ['title', 'price', 'subcategoryId'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      const errorMessage = createErrorMessage(404, 'Product not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      product[update] = req.body[update];
    });

    if (req.files) {
      const uploadedImages = req.files as Array<IImageFile>;

      for (let i = 0; i < uploadedImages.length; i++) {
        const savedImageUrl = await saveUploadedImage(
          PRODUCT_DIR,
          uploadedImages[i],
          PRODUCT_IMG_SIZE,
          PRODUCT_IMG_QUALITY
        )

        product.images.push(savedImageUrl!);
      }
    }

    await product.save();

    res.status(201).send(product);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit product failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default productEdit;