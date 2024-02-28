/**
 * @file Manages routes related to the root index page
 * @author Elizabeth Minty
 */

//create router using express, import CRUD from controllers, create/export CRUD routes using router
import express, { urlencoded, json } from "express";

// Import the index controllers module
import { get } from "../controllers/resources.js";

// Create an Express router
const router = express.Router();

// Export the router
export default router;