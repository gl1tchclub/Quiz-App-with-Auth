
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUserScore = async (req, res) => {
    try {
      const { userId } = req.user;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const { quizId } = req.body;
  
      const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
      });
  
      if (!quiz)
        return res.status(404).json({ msg: `No quiz found with ID ${quizId}` });
  
      // store all answers user has given for this quiz as an array to use further down
      const answers = quiz.userQuestionAnswers.filter((a) => a.userId === userId);
  
      // can only create user score when user has answered all 10 questions
      // check if status is correct here
      if (answers.length < 10)
        return res.status(400).json({
          msg: "Cannot update score until all questions have been answered",
        });
  
      // store the number of correct answers as score
      const score = answers.map((a) => a.isCorrect == true).length;
  
      const userScore = await prisma.userQuizScore.create({
        data: {
          id,
          quizId,
          score,
        },
      });
  
      return res
        .status(201)
        .json({ msg: "User score successfully recorded", data: userScore });
      // calc average quiz score
      // add score to list of scores (userquizscore)
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };