import { Router } from "express";
import addressAdd from "../controllers/addressControllers/addressAdd";
import addressDelete from "../controllers/addressControllers/addressDelete";
import addressEdit from "../controllers/addressControllers/addressEdit";
import addressGet from "../controllers/addressControllers/addressGet";
import addressGetById from "../controllers/addressControllers/addressGetById";
import auth from "../middleware/auth";

const addressRouter = Router();

// TYPE: POST /address
// DESCRIPTION: Create new address
// ACCESS: PRIVATE
addressRouter.post('/', auth, addressAdd);

// TYPE: GET /address
// DESCRIPTION: Get all user addresses
// ACCESS: PRIVATE
addressRouter.get('/', auth, addressGet);

// TYPE: GET /address/id
// DESCRIPTION: Get user address by id
// ACCESS: PRIVATE
addressRouter.get('/:id', auth, addressGetById);

// TYPE: DELETE /address/id
// DESCRIPTION: Delete user address by id
// ACCESS: PRIVATE
addressRouter.delete('/:id', auth, addressDelete);

// TYPE: PATCH /address/id
// DESCRIPTION: Edit user address by id
// ACCESS: PRIVATE
addressRouter.patch('/:id', auth, addressEdit);

export default addressRouter;