/**
 * @file Manages routes related to the root index page
 * @author Elizabeth Minty
 */
//create router using express, import CRUD from controllers, create/export CRUD routes using router
import express from "express";
import { getIndex } from "../controllers/v1/index.js";

// Create an Express router
const router = express.Router();

//GET ALL
router.get("/", getIndex);

// Export the router
export default router;
