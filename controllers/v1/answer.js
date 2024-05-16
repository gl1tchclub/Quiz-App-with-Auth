import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createQuestionAnswer = async (req, res) => {
  try {
    const { id } = req.user;
    const { quizId, questionId, answer } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz)
      return res.status(404).json({ msg: `No quiz found with ID ${quizId}` });

    const questionObj = quiz.questions.find((q) => q.id === questionId);

    if (!questionObj)
      return res
        .status(404)
        .json({ msg: `No questions found with ID ${questionId}` });

    const isCorrect = answer === questionObj.correctAnswer ? true : false;

    const userAnswer = await prisma.userQuestionAnswer.create({
      data: {
        id,
        quizId,
        questionId,
        answer,
        isCorrect,
      },
    });

    return res
      .status(201)
      .json({ msg: "User answer successfully recorded", data: userAnswer });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
