import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createQuiz = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to create a quiz",
      });
    }

    const { name, categoryId, difficulty, startDate, endDate } = req.body;

    let quiz = await prisma.user.findUnique({
      where: { name: name },
    });

    if (quiz)
      return res
        .status(409)
        .json({ msg: `Quiz with name ${name} already exists` });
    
    if (Object.keys(req.body).length < 5) return res
        .status(400)
        .json({ msg: `Please fill out all fields` })

    let res = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`);
    let quizData = await res.json().results;
    quiz = await prisma.quiz.create({
        data: {
            categoryId: categoryId,
            name: name,
            type: quizData[0].type,
            difficulty: difficulty,
            startDate: startDate,
            endDate: endDate,
        }
    })
    const quizId = quiz.id;
    quizData.forEach(async (q) => await prisma.question.create({ 
      quizId: quizId,
      question: q.question,
      correctAnswer: q.correct_answer,
      incorrectAnswers: q.incorrect_answers,
     }));

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
