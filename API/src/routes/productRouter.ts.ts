import { Router } from "express";
import productCreate from "../controllers/productControllers/productCreate";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";
import uploadImage from "../middleware/uploadImage";

const productRouter = Router();

// TYPE: POST /product
// DESCRIPTION: Create new product
// ACCESS: PRIVATE, ADMIN
productRouter.post('/', auth, authAdmin, uploadImage.array('images'), productCreate);

export default productRouter;