import { Router } from "express";
import orderCreate from "../controllers/orderControllers/orderCreate";

const orderRouter = Router();

// TYPE: POST /order
// DESCRIPTION: Create new order
// ACCESS: PRIVATE
orderRouter.post('/', orderCreate);

export default orderRouter;