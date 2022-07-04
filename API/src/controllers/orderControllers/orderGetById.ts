import { Request, Response } from "express";
import Order from "../../models/orderModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const orderGetById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      const errorMessage = createErrorMessage(404, 'Order not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    res.status(200).send(order);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Get order by id failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default orderGetById;