import { Router } from "express";
import productCreate from "../controllers/productControllers/productCreate";
import productDelete from "../controllers/productControllers/productDelete";
import productDeleteImage from "../controllers/productControllers/productDeleteImage";
import productEdit from "../controllers/productControllers/productEdit";
import productGet from "../controllers/productControllers/productGet";
import productGetById from "../controllers/productControllers/productGetById";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";
import uploadImage from "../middleware/uploadImage";

const productRouter = Router();

// TYPE: POST /product
// DESCRIPTION: Create new product
// ACCESS: PRIVATE, ADMIN
productRouter.post('/', auth, authAdmin, uploadImage.array('images'), productCreate);

// TYPE: GET /product
// DESCRIPTION: Get all products
// PAGINATION: limit=number&skip=number
// FILTERING: subcategoryId=string, productTitle=string
// SORTING: sortPrice=('desc' or 'asc'), sortTitle=('desc' or 'asc')
// ACCESS: PUBLIC
productRouter.get('/', productGet);

// TYPE: GET /product/id
// DESCRIPTION: Get product by id
// ACCESS: PUBLIC
productRouter.get('/:id', productGetById);

// TYPE: PATCH /product/id
// DESCRIPTION: Edit product by id
// ACCESS: PRIVATE, ADMIN
productRouter.patch('/:id', auth, authAdmin, uploadImage.array('images'), productEdit);

// TYPE: DELETE /product/id
// DESCRIPTION: delete product by id
// ACCESS: PRIVATE, ADMIN
productRouter.delete('/:id', auth, authAdmin, productDelete);

// TYPE: PATCH /product/image/id
// DESCRIPTION: Delete product single image
// ACCESS: PRIVATE, ADMIN
productRouter.patch('/image/:id', auth, authAdmin, productDeleteImage)

export default productRouter;