import { Router } from "express";
import { loginUser } from "../controllers/user.controllers.js";

const router = Router();

router.get("/", loginUser);

export default router;
