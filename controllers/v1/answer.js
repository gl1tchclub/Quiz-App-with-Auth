import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAnswer = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ msg: `No user found with ID ${userId}` });
    }
    const { quizId, questionId, answer } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    // Ensure quiz exists
    if (!quiz)
      return res.status(404).json({ msg: `No quiz found with ID ${quizId}` });

    const question = quiz.questions.find((q) => q.id === questionId);

    // Check that question exists in given quiz
    if (!question)
      return res
        .status(404)
        .json({ msg: `No question found with ID ${questionId} in this quiz` });

    // Set isCorrect by comparing given answer to correct answer
    const isCorrect = answer === question.correctAnswer ? true : false;

    const userAnswer = await prisma.userQuestionAnswer.create({
      data: {
        userId,
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

const getAnswers = async (req, res) => {
  try {
    const { quizId } = req.params.quizId;
    // const { userId } = req.user;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    // Ensure quiz exists
    if (!quiz)
      return res.status(404).json({ msg: `No quiz found with ID ${quizId}` });

    const allAnswers = quiz.userQuestionAnswers;

    // Get answers that associate with given user ID
    // const userAnswers = allAnswers.filter((ans) => allAnswers.userId === userId);

    // if (userAnswers.length === 0) return res.status(404).json({ msg: "No answers found" });

    if (allAnswers.length === 0)
      return res.status(404).json({ msg: "No answers found" });

    return res
      .status(200)
      .json({ msg: "Successfully fetched answers", data: answers });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateAnswer = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { userId } = req.user;

    const existingAnswer = await prisma.userQuestionAnswer.findUnique({
      where: { id: id },
    });
    if (!existingAnswer)
      return res.status(404).json({ msg: "Answer does not exist" });

    const updatedAnswer = await prisma.userQuestionAnswer.update({
      where: { id: id },
      data: { ...req.body },
    });

    return res
      .status(200)
      .json({ msg: "Successfully updated answer", data: updatedAnswer });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createAnswer, getAnswers, updateAnswer };
