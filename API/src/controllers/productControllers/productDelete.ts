import { Request, Response } from "express";
import Product from "../../models/productModel";
import deleteImageFS from "../../utils/images/deleteImageFS";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const productDelete = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      const errorMessage = createErrorMessage(404, 'Product not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    product.images.forEach(async (image) => {
      await deleteImageFS(image);
    });

    res.status(200).send(product);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Delete product failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default productDelete;