import { Request, Response } from "express";
import Order from "../../models/orderModel";
import { createErrorMessage } from "../../utils/messages/createErrorMessage";

const orderStatusEdit = async (req: Request, res: Response) => {  
  try {
    const allowedUpdates = ['status'];
    const updates = Object.keys(req.body);
    const isValidOperator = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperator) {
      const errorMessage = createErrorMessage(400, 'Invalid operators');
      return res.status(errorMessage.status).send(errorMessage);
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      const errorMessage = createErrorMessage(404, 'Order not found');
      return res.status(errorMessage.status).send(errorMessage);
    }

    updates.forEach(update => {
      order[update] = req.body[update];
    });

    console.log(order);
    

    await order.save();
    res.status(200).send(order);

  } catch (error) {
    const errorMessage = createErrorMessage(500, 'Edit order status failed', error);
    res.status(errorMessage.status).send(errorMessage);
  }
}

export default orderStatusEdit