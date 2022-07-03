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
import path from "path";
import productRouter from "./routes/productRouter.ts";
import sliderRouter from "./routes/sliderRouter";
import contactDataRouter from "./routes/contactDataRouter";
import contactFormRouter from "./routes/contactFormRouter";
import routeNotFound from "./middleware/routeNotFound";
import cartRouter from "./routes/cartRouter";
import orderRouter from "./routes/orderRouter";

const app = express();
connectDatabase();

app.use(cors());
app.use(express.json());

// USER | register, login, logout, logoutAll, getAll, getById, getMe, edit, deactivate, activate, ban, unban
app.use('/user', userRouter);

// ADMIN | add, remove, setAdminLevel
app.use('/admin', adminRouter);

// ADDRESS | add, get, getById, getUserAddresses, delete, editById
app.use('/address', addressRouter);

// CATEGORY | create, get, getById, edit, delete
app.use('/category', categoryRouter);

// SUBCATEGORY | create, get, getById, edit, delete
app.use('/subcategory', subcategoryRouter);

// PRODUCT | create, get, getById, edit, delete
app.use('/product', productRouter);

// SLIDER | create, get, getById, edit, delete
app.use('/slider', sliderRouter);

// CONTACT DATA | create, get, getById, edit, delete
app.use('/contactData', contactDataRouter);

// CONTACT FORM | create, get, getById, addAdminNote, toggleIsResolved
app.use('/contactForm', contactFormRouter);

// CART | calculate
app.use('/cart', cartRouter);

// ORDER | create, get, getById, changeStatus
app.use('/order', orderRouter);


//Serve images to frontend (SERVER_URL/images/...)
const dirname = path.resolve();
app.use('/images', express.static(path.join(dirname, '/images')));


//Route not found
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`>> Server running on PORT: ${PORT}`.yellow.bgBlack.bold);
});
