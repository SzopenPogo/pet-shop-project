import cors from "cors";
import express from "express";
import { PORT } from "./constants/app/app";
import 'colors';
import connectDatabase from "./config/database";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
import addressRouter from "./routes/addressRouter";
import categoryRouter from "./routes/categoryRouter";
import subcategoryRouter from "./routes/subcategoryRouter";

const app = express();
connectDatabase();

app.use(cors());
app.use(express.json());

// USER | register, login, logout, logoutAll, getAll, getById, edit, deactivate, activate, ban, unban
app.use('/user', userRouter);

// ADMIN | add, remove, setAdminLevel
app.use('/admin', adminRouter);

// ADDRESS | add, get, getById, delete, editById
app.use('/address', addressRouter);

// CATEGORY | create, get, getById, edit, delete
app.use('/category', categoryRouter);

// SUBCATEGORY | create, get, getById, edit, delete
app.use('/subcategory', subcategoryRouter);


app.listen(PORT, () => {
  console.log(`>> Server running on PORT: ${PORT}`.yellow.bgBlack.bold);
});

//TODO
// SUBCATEGORY add image upload for create and edit
// If SUBCATEGORY is deleted clear relations for all related products