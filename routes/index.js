//create router using express, import CRUD from controllers, create/export CRUD routes using router
import express, { urlencoded, json } from "express";

// Import the index controllers module
import { get } from "../controllers/index.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.get("/", get);

// Export the router
export default router;