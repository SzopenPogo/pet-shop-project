import { Router } from "express";
import subcategoryCreate from "../controllers/subcategoryControllers/subcategoryCreate";
import subcategoryDelete from "../controllers/subcategoryControllers/subcategoryDelete";
import subcategoryEdit from "../controllers/subcategoryControllers/subcategoryEdit";
import subcategoryGet from "../controllers/subcategoryControllers/subcategoryGet";
import subcategoryGetById from "../controllers/subcategoryControllers/subcategoryGetById";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";
import uploadImage from "../middleware/uploadImage";

const subcategoryRouter = Router();

// TYPE: POST /subcategory
// DESCRIPTION: Create new subcategory
// ACCESS: PRIVATE, ADMIN
subcategoryRouter.post('/', auth, authAdmin,  uploadImage.single('image'), subcategoryCreate);

// TYPE: GET /subcategory
// DESCRIPTION: Get all subcategories
// FILTERING: ?categoryId=string
// ACCESS: PUBLIC
subcategoryRouter.get('/', subcategoryGet);

// TYPE: GET /subcategory
// DESCRIPTION: Get subcategory by id
// ACCESS: PUBLIC
subcategoryRouter.get('/:id', subcategoryGetById);

// TYPE: PATCH /subcategory/:id
// DESCRIPTION: Edit subcategory by id
// ACCESS: PRIVATE, ADMIN
subcategoryRouter.patch('/:id', auth, authAdmin, uploadImage.single('image'), subcategoryEdit);

// TYPE: DELETE /subcategory/:id
// DESCRIPTION: Delete subcategory by id
// ACCESS: PRIVATE, ADMIN
subcategoryRouter.delete('/:id', auth, authAdmin, subcategoryDelete);

export default subcategoryRouter;