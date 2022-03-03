import cors from "cors";
import express from "express";
import { PORT } from "./constants/app/app";
import 'colors';
import connectDatabase from "./config/database";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
import addressRouter from "./routes/addressRouter";

const app = express();
connectDatabase();

app.use(cors());
app.use(express.json());

// USER | register, login, logout, logoutAll, getAll, getById, edit, deactivate, activate, ban, unban
app.use('/user', userRouter);

// ADMIN | add, remove, setAdminLevel
app.use('/admin', adminRouter);

// ADDRESS | add, remove, editById
app.use('/address', addressRouter);


app.listen(PORT, () => {
  console.log(`>> Server running on PORT: ${PORT}`.yellow.bgBlack.bold);
});