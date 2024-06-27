import { PrismaClient } from "@prisma/client";
import { getQuiz } from "./quiz.js";

const prisma = new PrismaClient();

const createUserScore = async (req, res) => {
  try {
    const { userId } = req.user;
    const { quizId } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz)
      return res.status(404).json({ error: `No quiz found with ID ${quizId}` });

    // store all answers user has given for this quiz as an array to use further down
    const answers = quiz.userQuestionAnswers.filter((a) => a.userId === userId);

    // can only create user score when user has answered all 10 questions
    // check if status is correct here
    if (answers.length < 10)
      return res.status(400).json({
        error: "Cannot update score until all questions have been answered",
      });

    // store the number of correct answers as score
    const score = answers.map((a) => a.isCorrect == true).length;

    const userScore = await prisma.userQuizScore.create({
      data: {
        userId,
        quizId,
        score,
      },
    });

    return res
      .status(201)
      .json({ msg: "User score successfully recorded", data: userScore });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// Gets average score for any given quiz
const getAverageQuizScore = async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        questions: true,
        userQuizScores: true,
      },
    });

    // Calculate average score function
    const averageScore = () => {
      let sum = 0;
      const userScores = quiz.userQuizScores;
      
      if (!userScores) return [];
      
      userScores.forEach((userScore) => {
        sum += userScore.score;
      });
      return sum / userScores.length;
    };

    return res.json({
      msg: "Successfully retrieved average score",
      data: averageScore,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export { createUserScore, getAverageQuizScore };
