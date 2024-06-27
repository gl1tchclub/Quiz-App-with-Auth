import express from "express";
import * as resources from "../../controllers/v1/quiz.js";
import * as score from "../../controllers/v1/score.js";

const router = express.Router();

//GET ALL
router.get("/all", (req, res) => resources.getQuizzes(req, res));

//SCORE CRUD
router.get("/scores/:id", (req, res) => score.getAverageQuizScore(req, res));

export default router;
