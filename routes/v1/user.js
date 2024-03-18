//operations relating to user information depending on user role
//e.g. getting user info or updating info, etc
import express from "express";
import * as resources from "../../controllers/v1/user.js";
import { validatePostAnimal } from "../middleware/validation.js";

const router = express.Router()

//POST ??
router.post("/", (req, res) => resources.createUser(req, res, "user"))

//GET ALL
router.get("/", (req, res) => resources.getUsers(req, res, "user"))

//GET ID
router.get("/:id", (req, res) => resources.getID(req, res, "user"))

//PUT
router.put("/:id", validatePostUser, (req, res) =>
  resources.update(req, res, "user")
)

//DELETE
router.delete("/:id", (req, res) => resources.deleteType(req, res, "user"))

export default router

import express from "express";

