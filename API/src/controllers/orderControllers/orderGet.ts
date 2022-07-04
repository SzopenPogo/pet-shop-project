import { Request, Response } from "express";
import { IMatchObject } from "../../interfaces/other/IMatch";
import { ISortObject } from "../../interfaces/other/ISort";
import Order from "../../models/orderModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const orderGet = async (req: Request, res: Response) => {
  try {
    const match: IMatchObject = {};
    const sort: ISortObject = {};

    if (req.query.userId) {
      match.userId = req.query.userId;
    }

    if (req.query.status) {
      match.status = req.query.status;
    }

    if (req.query.sortDate) {
      sort.createdAt = (req.query.sortDate === 'desc') ? -1 : 1;
    }

    const order = await Order.find(match).sort(sort);

    res.status(200).send(order);
    
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get orders failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default orderGet;