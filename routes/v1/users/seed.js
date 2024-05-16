//operations relating to user information depending on user role
//e.g. getting user info or updating info, etc
import express from "express";
import seedBasicUsers from "../../../controllers/v1/seed.js";

const router = express.Router();

//POST
router.post("/", (req, res) => seedBasicUsers(req, res));

export default router;
