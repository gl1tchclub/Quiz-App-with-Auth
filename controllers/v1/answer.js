import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAnswer = async (req, res) => {
  try {
    // Store user object
    const { userId } = req.user;

    const answers = req.body.answers;

    const record = await prisma.quiz.findUnique({
      where: { id: answers[0].quizId },
      include: {
        questions: true,
      },
    });

    // Ensure quiz exists
    if (!record)
      return res.status(404).json({ error: `No quiz found with ID ${quizId}` });

    let score = 0;
    let isCorrect = false;
    const comparedAnswers = answers.map((answer, index) => {
      if (answer === record.questions[index].correctAnswer) {
        score++;
        isCorrect = true;
      } else isCorrect = false;

      return {
        userId: req.user.id,
        questionId: record.questions[index].id,
        quizId: record.questions[index].quizId,
        answer: answer,
        isCorrect: isCorrect,
      };
    });

    await prisma.userQuestionAnswer.createMany({
      data: comparedAnswers,
    });
    await prisma.userParticipateQuiz.create({
      data: {
        userId: req.user.id,
        quizId: record.id,
      },
    });

    return res
      .status(201)
      .json({ msg: "User answer successfully recorded", data: userAnswer });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const getAnswers = async (req, res) => {
  try {
    const { quizId } = req.body;
    const { userId } = req.user;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Ensure quiz exists
    if (!quiz)
      return res.status(404).json({ error: `No quiz found with ID ${quizId}` });

    const allAnswers = user.UserQuestionAnswer;

    // Get answers that associate with given quiz ID
    const userAnswers = allAnswers.filter((ans) => ans.quizId === quizId);

    if (userAnswers.length === 0)
      return res.status(404).json({ error: "No answers found" });

    return res
      .status(200)
      .json({ msg: "Successfully fetched answers", data: userAnswers });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// Don't need?
const updateAnswer = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { userId } = req.user;

    const existingAnswer = await prisma.userQuestionAnswer.findUnique({
      where: { id: id },
    });
    if (!existingAnswer)
      return res.status(404).json({ error: "Answer does not exist" });

    const updatedAnswer = await prisma.userQuestionAnswer.update({
      where: { id: id },
      data: { ...req.body },
    });

    return res
      .status(200)
      .json({ msg: "Successfully updated answer", data: updatedAnswer });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export { createAnswer, getAnswers, updateAnswer };
