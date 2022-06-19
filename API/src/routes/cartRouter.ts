import { Router } from "express";
import cartCalculate from "../controllers/cartControllers/cartCalculate";

const cartRouter = Router();


// TYPE: POST /cart
// DESCRIPTION: Find and return cart items and calculate total price
// ACCESS: PUBLIC
cartRouter.post('/', cartCalculate)

export default cartRouter;