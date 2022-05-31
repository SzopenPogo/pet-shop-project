import { Request, Response } from "express";
import Product from "../../models/productModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const productDeleteImage = async (req: Request, res: Response) => {
  try {
    if(!req.body.image) {
      const errorMessage = createErrorMessage(400, 'Image name required');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      const errorMessage = createErrorMessage(404, 'Product not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    product.images = product.images.filter(image => image !== req.body.image);

    await product.save();
    res.status(201).send(product);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Delete product image failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default productDeleteImage;