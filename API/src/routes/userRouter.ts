import { Router } from "express";
import userLogoutAll from "../controllers/userControllers/manage/userLogoutAll";
import userLogin from "../controllers/userControllers/manage/userLogin";
import userLogout from "../controllers/userControllers/manage/userLogout";
import userRegister from "../controllers/userControllers/manage/userRegister";
import auth from "../middleware/auth";
import authAdmin from "../middleware/authAdmin";
import userGetAll from "../controllers/userControllers/actions/userGetAll";
import userGetById from "../controllers/userControllers/actions/userGetById";
import userEdit from "../controllers/userControllers/actions/userEdit";
import userEditById from "../controllers/userControllers/actions/userEditById";

const userRouter = Router();

// TYPE: POST /user/register
// DESCRIPTION: Register new user
// ACCESS: PUBLIC
userRouter.post('/register', userRegister);

// TYPE: POST /user/login
// DESCRIPTION: Login user
// ACCESS: PUBLIC
userRouter.post('/login', userLogin);

// TYPE: POST /user/logout
// DESCRIPTION: Logout user
// ACCESS: PUBLIC
userRouter.post('/logout', auth, userLogout);

// TYPE: POST /user/logoutAll
// DESCRIPTION: Logout everywhere
// ACCESS: PUBLIC
userRouter.post('/logoutAll', auth, userLogoutAll);

// TYPE: GET /user
// PAGINATION: limit=number&skip=number
// FILTERING: isActive=boolean, isAdmin=boolean
// DESCRIPTION: Get all users
// ACCESS: PRIVATE, ADMIN
userRouter.get('/', auth, authAdmin, userGetAll);

// TYPE: GET /user/id
// DESCRIPTION: Get user by id
// ACCESS: PRIVATE, ADMIN
userRouter.get('/:id', auth, authAdmin, userGetById);

// TYPE: PATCH /user/edit/me
// DESCRIPTION: Edit user
// ACCESS: PRIVATE
userRouter.patch('/edit/me', auth, userEdit);

// TYPE: PATCH /user/edit/id
// DESCRIPTION: Edit user by id
// ACCESS: PRIVATE, ADMIN
userRouter.patch('/edit/:id', auth, authAdmin, userEditById);

export default userRouter;