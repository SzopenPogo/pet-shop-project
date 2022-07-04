import { Request, Response } from "express";
import Order from "../../models/orderModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const orderCreate = async (req: Request, res: Response) => {
  console.log((req.body));
  
  try {
    const order = new Order({
      ...req.body
    });
    
    await order.save();
    res.status(200).send(order);
  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Create order failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default orderCreate;