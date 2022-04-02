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
import userDeactivate from "../controllers/userControllers/actions/userDeactivate";
import userActivate from "../controllers/userControllers/actions/userActivate";
import authInactive from "../middleware/authInactive";
import userBan from "../controllers/userControllers/actions/userBan";
import userUnban from "../controllers/userControllers/actions/userUnban";
import userGetMe from "../controllers/userControllers/actions/userGetMe";
import uploadImage from "../middleware/uploadImage";
import userChangeAvatar from "../controllers/userControllers/manage/userChangeAvatar";

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

// TYPE: GET /user/id/id
// DESCRIPTION: Get user by id
// ACCESS: PRIVATE, ADMIN
userRouter.get('/id/:id', auth, authAdmin, userGetById);

// TYPE: GET /user/me
// DESCRIPTION: Get user own profile data
// ACCESS: PRIVATE
userRouter.get('/me', auth, userGetMe);

// TYPE: PATCH /user/edit/me
// DESCRIPTION: Edit user
// ACCESS: PRIVATE
userRouter.patch('/edit/me', auth, userEdit);

// TYPE: PATCH /user/edit/id
// DESCRIPTION: Edit user by id
// ACCESS: PRIVATE, ADMIN
userRouter.patch('/edit/:id', auth, authAdmin, userEditById);

// TYPE: POST /deactivate/me
// DESCRIPTION: Deactivate user
// ACCESS: PRIVATE
userRouter.post('/deactivate/me', auth, userDeactivate);

// TYPE: POST /activate/me
// DESCRIPTION: Activate user
// ACCESS: PRIVATE
userRouter.post('/activate/me', authInactive, userActivate);

// TYPE: POST /ban/id
// DESCRIPTION: Ban user
// ACCESS: PRIVATE, ADMIN
userRouter.post('/ban/:id', auth, authAdmin, userBan);

// TYPE: POST /unban/id
// DESCRIPTION: Unban user
// ACCESS: PRIVATE, ADMIN
userRouter.post('/unban/:id', auth, authAdmin, userUnban);

// TYPE: PATCH /avatar
// DESCRIPTION: Change user avatar
// ACCESS: PRIVATE
userRouter.patch('/avatar', auth, uploadImage.single('image'), userChangeAvatar);

export default userRouter;