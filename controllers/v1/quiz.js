import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createQuiz = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });

    // Only admins can create quiz
    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to create a quiz",
      });
    }

    const { name, categoryId, type, difficulty, startDate, endDate } = req.body;

    // Check if quiz has already been made
    let quiz = await prisma.user.findUnique({
      where: { name: name },
    });

    if (quiz)
      return res
        .status(409)
        .json({ msg: `Quiz with name ${name} already exists` });

    if (Object.keys(req.body).length < 5)
      return res.status(400).json({ msg: `Please fill out all fields` });

    let res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=${type}`,
    );
    let quizData = await res.json().results;

    // Insert quiz data
    quiz = await prisma.quiz.create({
      data: {
        categoryId: categoryId,
        name: name,
        type: type,
        difficulty: difficulty,
        startDate: startDate,
        endDate: endDate,
      },
    });

    // Insert question data with associated quiz ID
    const quizId = quiz.id;
    quizData.forEach(
      async (q) =>
        await prisma.question.create({
          quizId: quizId,
          question: q.question,
          correctAnswer: q.correct_answer,
          incorrectAnswers: q.incorrect_answers,
        }),
    );
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
