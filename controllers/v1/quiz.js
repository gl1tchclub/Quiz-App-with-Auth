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
    let json = await res.json();

    if (json.response_code > 0) return res.status(403).json({ msg: "Failed to fetch"});

    // Insert quiz data
    quiz = await prisma.quiz.create({
      data: {
        categoryId,
        name,
        type,
        difficulty,
        startDate,
        endDate,
      },
    });

    // Insert question data with associated quiz ID
    let questions = json.results.forEach(
      async (q) =>
        await prisma.question.create({
          quizId: quiz.id,
          question: q.question,
          correctAnswer: q.correct_answer,
          incorrectAnswers: q.incorrect_answers,
        }),
    );

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

// Update a quiz when user participates (update av score, who's participated)
const createParticipate = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "You've already participated in this quiz",
      });
    }
    

    // add ID to userparticipatequiz
    // update userquestionanswer
    // calc average quiz score
    // add score to list of scores (userquizscore)

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
}

const updateQuestionAnswer = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });


    // add ID to userparticipatequiz
    // update userquestionanswer
    // calc average quiz score
    // add score to list of scores (userquizscore)

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
}

const updateScore = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });


    // add ID to userparticipatequiz
    // update userquestionanswer
    // calc average quiz score
    // add score to list of scores (userquizscore)

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
}
