import { Router } from "express";
import auth from "../authentication/auth";
import signinDetails from "../apis/signin";
import signupDetails from "../apis/signup";
import category from "../apis/category";

const userRouter = Router();

userRouter.use('/signin',signinDetails);
userRouter.use('/signup',signupDetails);

userRouter.use(auth);

userRouter.use('/category',category)

// userRouter.use('/removePickupaddress',removePickupaddress);

export default userRouter;  