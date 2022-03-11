import { Request, Response } from "express";
import { IMatchObject } from "../../interfaces/other/IMatch";
import { ISortObject } from "../../interfaces/other/ISort";
import Product from "../../models/productModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const productGet = async (req: Request, res: Response) => {
  try {
    const match: IMatchObject = {};
    const sort: ISortObject = {};

    if (req.query.subcategoryId) {
      match.subcategoryId = req.query.subcategoryId;
    }

    if (req.query.productTitle) {
      match.title = {
        $regex: req.query.productTitle,
        $options: 'i'
      };
    }

    if (req.query.sortPrice) {
      sort.price = (req.query.sortPrice === 'desc') ? -1 : 1;
    }

    if (req.query.sortTitle) {
      sort.title = (req.query.sortTitle === 'desc') ? -1 : 1;
    }
    
    const product = await Product.find(match)
      .sort(sort)
      .limit(req.query.limit ? +req.query.limit : 25)
      .skip(req.query.skip ? +req.query.skip : 0);
    
    res.status(200).send(product);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get products failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default productGet;