import { Router } from "express";
import express from "express";

import { register, login } from "../../controllers/v1/auth.js";
import {validateRegister} from "../../middleware/validation.js";

const router = express.Router();

router.post("/register", validateRegister, (req, res) => register(req, res));

router.route("/login").post(login);

export default router;