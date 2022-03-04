import { Router } from "express";
import categoryCreate from "../controllers/categoryControllers/categoryCreate";
import categoryDelete from "../controllers/categoryControllers/categoryDelete";
import categoryEdit from "../controllers/categoryControllers/categoryEdit";
import categoryGet from "../controllers/categoryControllers/categoryGet";
import categoryGetById from "../controllers/categoryControllers/categoryGetById";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const categoryRouter = Router();

// TYPE: POST /category
// DESCRIPTION: Create new category
// ACCESS: PRIVATE, ADMIN
categoryRouter.post('/', auth, authAdmin, categoryCreate);

// TYPE: GET /category
// DESCRIPTION: Get all categories
// ACCESS: PUBLIC
categoryRouter.get('/', categoryGet);

// TYPE: GET /category/id
// DESCRIPTION: Get category by id
// ACCESS: PUBLIC
categoryRouter.get('/:id', categoryGetById);

// TYPE: PATCH /category/id
// DESCRIPTION: Edit category by id
// ACCESS: PRIVATE, ADMIN
categoryRouter.patch('/:id', auth, authAdmin, categoryEdit);

// TYPE: DELETE /category/id
// DESCRIPTION: Delete category by id
// ACCESS: PRIVATE, ADMIN
categoryRouter.delete('/:id', auth, authAdmin, categoryDelete);

export default categoryRouter;