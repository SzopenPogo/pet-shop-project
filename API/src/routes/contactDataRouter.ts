import { Router } from "express";
import contactDataCreate from "../controllers/contactDataControllers/contactDataCreate";
import contactDataDelete from "../controllers/contactDataControllers/contactDataDelete";
import contactDataEdit from "../controllers/contactDataControllers/contactDataEdit";
import contactDataGet from "../controllers/contactDataControllers/contactDataGet";
import contactDataGetById from "../controllers/contactDataControllers/contactDataGetById";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const contactDataRouter = Router();

// TYPE: POST /contactData
// DESCRIPTION: Create new contact data
// ACCESS: PRIVATE, ADMIN
contactDataRouter.post('/', auth, authAdmin, contactDataCreate);

// TYPE: GET /contactData
// DESCRIPTION: Get all contact data
// ACCESS: PUBLIC
contactDataRouter.get('/', contactDataGet);

// TYPE: GET /contactData/id
// DESCRIPTION: Get contact data by id
// ACCESS: PUBLIC
contactDataRouter.get('/:id', contactDataGetById);

// TYPE: PATCH /contactData/:id
// DESCRIPTION: Edit contact data
// ACCESS: PRIVATE, ADMIN
contactDataRouter.patch('/:id', auth, authAdmin, contactDataEdit);

// TYPE: DELETE /contactData/:id
// DESCRIPTION: Delete contact data
// ACCESS: PRIVATE, ADMIN
contactDataRouter.delete('/:id', auth, authAdmin, contactDataDelete)

export default contactDataRouter;