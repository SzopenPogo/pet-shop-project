import { Router } from "express";
import adminAdd from "../controllers/adminControllers/adminAdd";
import adminRemove from "../controllers/adminControllers/adminRemove";
import adminSetLevel from "../controllers/adminControllers/adminSetLevel";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";

const adminRouter = Router();

// TYPE: POST /admin/add/id
// DESCRIPTION: Add new admin
// ACCESS: ADMIN LVL 3
adminRouter.post('/add/:id', auth, authAdmin, adminAdd);

// TYPE: POST /admin/remove/id
// DESCRIPTION: Remove admin
// ACCESS: ADMIN LVL 3
adminRouter.post('/remove/:id', auth, authAdmin, adminRemove);

// TYPE: POST /admin/level/id
// DESCRIPTION: Set admin admin (0-2)
// ACCESS: ADMIN LVL 3
adminRouter.post('/level/:id', auth, authAdmin, adminSetLevel);

export default adminRouter;