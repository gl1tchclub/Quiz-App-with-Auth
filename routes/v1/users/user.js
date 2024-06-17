//operations relating to user information depending on user role
//e.g. getting user info or updating info, etc
import express from "express";
import * as resources from "../../../controllers/v1/user.js";

const router = express.Router();

//GET ALL
router.get("/all", (req, res) => resources.getUsers(req, res));

//GET ID
router.get("/:uuid", (req, res) => resources.getUser(req, res));

//PUT
router.put("/:uuid", (req, res) => resources.updateUser(req, res));

//DELETE
router.delete("/:uuid", (req, res) => resources.deleteUser(req, res));

export default router;
