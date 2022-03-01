import cors from "cors";
import express from "express";
import { PORT } from "./constants/app/app";
import 'colors';
import connectDatabase from "./config/database";
import userRouter from "./routes/userRouter";

const app = express();
connectDatabase();

app.use(cors());
app.use(express.json());

// USER | register, login, logout, logoutAll, getAll, getById, edit, deactivate, activate, ban, unban
app.use('/user', userRouter);


app.listen(PORT, () => {
  console.log(`>> Server running on PORT: ${PORT}`.yellow.bgBlack.bold);
});


//TODO
//userLogin - Check Admin Key