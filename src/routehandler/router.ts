import express from 'express';
import { Router } from "express";
import path from "path";

import auth from "../authentication/auth";
import signinDetails from "../apis/signin";
import signupDetails from "../apis/signup";
import category from "../apis/category";
import subcategory from "../apis/subcategory";
import product from "../apis/product";

const userRouter = Router();

userRouter.use('/signin',signinDetails);
userRouter.use('/signup',signupDetails);
userRouter.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

userRouter.use(auth);

userRouter.use('/category',category)
userRouter.use('/subcategory',subcategory)
userRouter.use('/product',product)

// userRouter.use('/removePickupaddress',removePickupaddress);

export default userRouter;  