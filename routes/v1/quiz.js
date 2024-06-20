//operations relating to quiz information depending on user role
//e.g. getting user quiz or updating info, etc
import express from "express";
import * as resources from "../../controllers/v1/quiz.js";
import * as score from "../../controllers/v1/score.js";
import * as answer from "../../controllers/v1/answer.js";
import * as participate from "../../controllers/v1/participate.js";

const router = express.Router();

// QUIZ CRUD
//POST
router.post("/", (req, res) => resources.createQuiz(req, res));

//DELETE
router.delete("/delete/:id", (req, res) => resources.deleteQuiz(req, res));

// SCORE CRUD
router.post("/scores", (req, res) => score.createUserScore(req, res));

// PARTICIPATE CRUD
router.post("/participation", (req, res) =>
  participate.createParticipate(req, res),
);

// ANSWER CRUD
router.post("/userAnswers", (req, res) => answer.createAnswer(req, res));

router.get("/userAnswers", (req, res) => answer.getAnswers(req, res));

export default router;
