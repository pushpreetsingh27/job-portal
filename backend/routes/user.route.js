import express from 'express';
import { login, logout, signUp, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post("/signup" , signUp)
router.post("/login" , login)
router.get("/logout" , logout)
router.post("/profile/update" , isAuthenticated , updateProfile)

export default router;