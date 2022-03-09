import { Request, Response } from "express";
import Subcategory from "../../models/subcategoryModel";
import deleteImageFS from "../../utils/images/deleteImageFS";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const subcategoryDelete = async (req: Request, res: Response) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

    if (!subcategory) {
      const errorMessage = createErrorMessage(404, 'Subcategory not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    await subcategory.populate('productRef');

    if (subcategory.productRef) {
      for (let i = 0; i < subcategory.productRef.length; i++) {
        subcategory.productRef[i].subcategoryId = null!;
        await subcategory.productRef[i].save();
      }
    }

    await deleteImageFS(subcategory.imageUrl);

    res.status(200).send(subcategory);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Delete subcategory failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default subcategoryDelete;