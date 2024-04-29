//operations relating to quiz information depending on user role
//e.g. getting user quiz or updating info, etc
import express from "express";
import * as resources from "../../controllers/quiz.js";

const router = express.Router();

//POST
router.post("/", (req, res) => resources.createQuiz(req, res));

//GET ALL
router.get("/", (req, res) => resources.getQuizzes(req, res));

//GET QUIZ SCORE DATA BY ID
router.get("/:id", (req, res) => resources.getQuizScores(req, res));

//DELETE
router.delete("/:id", (req, res) => resources.deleteQuiz(req, res));

export default router;
