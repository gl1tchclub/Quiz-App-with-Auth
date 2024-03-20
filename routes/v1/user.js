//operations relating to user information depending on user role
//e.g. getting user info or updating info, etc
import express from "express";
import * as resources from "../../controllers/v1/user.js";

const router = express.Router();

//POST ??
router.post("/", (req, res) => resources.seedBasicUser(req, res));

//GET ALL
router.get("/", (req, res) => resources.getUsers(req, res));

//GET ID
router.get("/:id", (req, res) => resources.getID(req, res));

//PUT
router.put("/:id", (req, res) => resources.update(req, res));

//DELETE
router.delete("/:uuid", (req, res) => resources.deleteUser(req, res));

// /users/seed/basic

export default router;
