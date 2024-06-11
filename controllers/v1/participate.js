import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update a quiz when user participates (update av score, who's participated)
const createParticipate = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const { quizId } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz)
      return res.status(404).json({ error: `No quiz found with ID ${quizId}` });

    if (
      quiz.userParticipateQuizzes.some((obj) => obj.userId === userId) &&
      user.role == "BASIC_USER"
    )
      return res
        .status(400)
        .json({ error: "You cannot participate in this quiz again" });

    const participation = await prisma.userParticipateQuiz.create({
      data: {
        userId,
        quizId,
      },
    });

    return res.status(201).json({
      msg: "Participation successfully registered",
      data: participation,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default createParticipate;
