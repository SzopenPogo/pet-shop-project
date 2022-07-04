import { Router } from "express";
import orderCreate from "../controllers/orderControllers/orderCreate";
import orderGet from "../controllers/orderControllers/orderGet";
import orderGetById from "../controllers/orderControllers/orderGetById";
import orderGetMe from "../controllers/orderControllers/orderGetMe";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const orderRouter = Router();

// TYPE: POST /order
// DESCRIPTION: Create new order
// ACCESS: PUBLIC
orderRouter.post('/', orderCreate);

// TYPE: GET /order
// DESCRIPTION: Get all orders
// ACCESS: PRIVATE, ADMIN
// FILTERING: userId=string, status=string
// SORTING: createdAt=('desc' or 'asc')
orderRouter.get('/', auth, authAdmin, orderGet);

// TYPE: GET /order/id
// DESCRIPTION: Get order by id
// ACCESS: PRIVATE, ADMIN
orderRouter.get('/:id', auth, authAdmin, orderGetById);

// TYPE: GET /order/me
// DESCRIPTION: Get user orders
// ACCESS: PRIVATE
orderRouter.get('/me', auth, orderGetMe);

export default orderRouter;