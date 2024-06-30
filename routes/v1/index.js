/**
 * @file Manages routes related to the root index page
 * @author Elizabeth Minty
 */
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  let x = [
    "Welcome! Here are all the available routes",
    "Home: https://two4-mintep1-app-dev.onrender.com/api/v1/",
    "Get Quizzes (no auth): https://two4-mintep1-app-dev.onrender.com/api/v1/public/all",
    "Get Quiz Average Score (no auth): https://two4-mintep1-app-dev.onrender.com/api/v1/public/:id",
    "Seed basic users (admin only): https://two4-mintep1-app-dev.onrender.com/api/v1/seedBasicUsers",
    "Login: https://two4-mintep1-app-dev.onrender.com/api/v1/auth/login",
    "Register: https://two4-mintep1-app-dev.onrender.com/api/v1/auth/register",
    "Get All Users: https://two4-mintep1-app-dev.onrender.com/api/v1/users/all",
    "Get/Put/Del User by ID: https://two4-mintep1-app-dev.onrender.com/api/v1/users/:uuid",
    "Create Quiz: https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/create",
    "Get/Del/Put Quiz: https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/:id",
    "Create Score: https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/scores",
    "Create Participation: https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/participation",
    "Get User Answers: https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/userAnswers",
    "Create User Answers: https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/createAnswers",

  ]
  res.send(x)
})

export default router;
