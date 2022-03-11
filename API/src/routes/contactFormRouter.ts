import { Router } from "express";
import contactFormAddAdminNote from "../controllers/contactFormControllers/contactFormAddAdminNote";
import contactFormCreate from "../controllers/contactFormControllers/contactFormCreate";
import contactFormGet from "../controllers/contactFormControllers/contactFormGet";
import contactFormGetById from "../controllers/contactFormControllers/contactFormGetById";
import contactFormToggleResolved from "../controllers/contactFormControllers/contactFormToggleResolved";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const contactFormRouter = Router();

// TYPE: POST /contactForm
// DESCRIPTION: Create new contact form
// ACCESS: PUBLIC
contactFormRouter.post('/', contactFormCreate);

// TYPE: GET /contactForm
// DESCRIPTION: Get contact form
// PAGINATION: limit=number&skip=number
// FILTERING: isResolvedMatch=boolean
// SORTING: isResolvedSort=('desc' or 'asc'), createdAt=('desc' or 'asc'), updatedAt=('desc' or 'asc')
// ACCESS: PRIVATE, ADMIN
contactFormRouter.get('/', auth, authAdmin, contactFormGet);

// TYPE: GET /contactForm/id
// DESCRIPTION: Get contact form by id
// ACCESS: PRIVATE, ADMIN
contactFormRouter.get('/:id', auth, authAdmin, contactFormGetById);

// TYPE: POST /contactForm/adminNote/id
// DESCRIPTION: Add admin note to contact form
// ACCESS: PRIVATE, ADMIN
contactFormRouter.post('/adminNote/:id', auth, authAdmin, contactFormAddAdminNote);

// TYPE: POST /contactForm/isResolved/id
// DESCRIPTION: Toggle contact form resloved
// ACCESS: PRIVATE, ADMIN
contactFormRouter.post('/isResolved/:id', auth, authAdmin, contactFormToggleResolved);

export default contactFormRouter;