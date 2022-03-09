import { Request, Response } from 'express';
import Product from '../../models/productModel';
import { createErrorMessage } from '../../utils/messages/createErrorMessage';

const productGetById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const errorMessage = createErrorMessage(404, 'Product not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(product);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get product by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default productGetById;