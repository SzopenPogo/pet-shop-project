import { Request, Response } from 'express';
import Category from '../../models/categoryModel';
import { createErrorMessage } from '../../utils/messages/createErrorMessage';

const categoryGet = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({});

    if (!categories) {
      return
    }
    
    for (let i = 0; i < categories.length; i++) {
      await categories[i].populate('subcategoryRef')
    }

    res.status(200).send(categories);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get category failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default categoryGet