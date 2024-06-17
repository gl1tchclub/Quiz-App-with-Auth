/**
 * @file Manages routes related to the root index page
 * @author Elizabeth Minty
 */
//create router using express, import CRUD from controllers, create/export CRUD routes using router
import express from "express";
import * as score from "../../controllers/v1/score.js";
import * as quiz from "../../controllers/v1/quiz.js";

// Create an Express router
const router = express.Router();

//GET ALL
router.get("/all", (req, res) => quiz.getQuizzes(req, res));

//GET BY ID
router.get("/:id", (req, res) => quiz.getQuiz(req, res));

//GET SCORES
router.get("/scores/:type", (req, res) => score.getQuizScores(req, res));

// Export the router
export default router;
