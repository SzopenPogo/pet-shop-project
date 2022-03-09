import { Router } from "express";
import sliderCreate from "../controllers/sliderControllers/sliderCreate";
import sliderDelete from "../controllers/sliderControllers/sliderDelete";
import sliderEdit from "../controllers/sliderControllers/sliderEdit";
import sliderGet from "../controllers/sliderControllers/sliderGet";
import sliderGetById from "../controllers/sliderControllers/sliderGetById";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";
import uploadImage from "../middleware/uploadImage";

const sliderRouter = Router();

// TYPE: POST /slider
// DESCRIPTION: Create new slider
// ACCESS: PRIVATE, ADMIN
sliderRouter.post('/', auth, authAdmin, uploadImage.single('image'), sliderCreate);

// TYPE: GET /slider
// DESCRIPTION: Get all sliders
// ACCESS: PUBLIC
sliderRouter.get('/', sliderGet);

// TYPE: GET /slider/id
// DESCRIPTION: Get slider by id
// ACCESS: PUBLIC
sliderRouter.get('/:id', sliderGetById);

// TYPE: PATCH /slider/id
// DESCRIPTION: Edit slider
// ACCESS: PRIVATE, ADMIN
sliderRouter.patch('/:id', auth, authAdmin, uploadImage.single('image'), sliderEdit);

// TYPE: DELETE /slider/id
// DESCRIPTION: Delete slider
// ACCESS: PRIVATE, ADMIN
sliderRouter.delete('/:id', auth, authAdmin, sliderDelete);

export default sliderRouter;