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
    
    const { categoryId, name, type, difficulty, startDate, endDate } = req.body;

    // Check if quiz has already been made
    let quiz = await prisma.quiz.findFirst({
      where: { name: name },
    });

    if (quiz)
      return res
        .status(409)
        .json({ msg: `Quiz with name ${name} already exists` });

    if (Object.keys(req.body).length < 6)
      return res.status(400).json({ msg: `Please fill out all fields` });

    let quizFetch = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=${type}`,
    );
    let json = await quizFetch.json();

    if (json.response_code > 0)
      return res.status(403).json({ msg: "Failed to fetch" });

    // Insert quiz data
    quiz = await prisma.quiz.create({
      data: {
        categoryId,
        name,
        type,
        difficulty,
        startDate,
        endDate,
        questions: {
          create: [
            json.results.forEach(
              async (q) =>
                await prisma.question.create({
                  data: {
                    question: q.question,
                    correctAnswer: q.correct_answer,
                    incorrectAnswers: q.incorrect_answers,
                  },
                }),
            ),
          ],
        },
      },
    });

    return res.status(201).json({
      msg: "Quiz successfully created",
      data: quiz,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createQuiz };
