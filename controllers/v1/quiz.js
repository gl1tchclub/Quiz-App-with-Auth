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
    let quiz = await prisma.quiz.findUnique({
      where: { name: name },
    });

    if (quiz)
      return res
        .status(409)
        .json({ msg: `Quiz with name ${name} already exists` });

    if (Object.keys(req.body).length < 6)
      return res.status(400).json({ msg: `Please fill out all fields` });

    let res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=${type}`,
    );
    let json = await res.json();

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
                  quizId: quiz.id,
                  question: q.question,
                  correctAnswer: q.correct_answer,
                  incorrectAnswers: q.incorrect_answers,
                }),
            ),
          ],
        },
      },
    });

    // Insert question data with associated quiz ID
    // let questions = json.results.forEach(
    //   async (q) =>
    //     await prisma.question.create({
    //       quizId: quiz.id,
    //       question: q.question,
    //       correctAnswer: q.correct_answer,
    //       incorrectAnswers: q.incorrect_answers,
    //     }),
    // );

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
    const { userId } = req.user;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    const { quizId } = req.body;

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz)
      return res.status(404).json({ msg: `No quiz found with ID ${quizId}` });

    if (
      quiz.userParticipateQuizzes.some((obj) => obj.userId === userId) &&
      user.role == "BASIC_USER"
    )
      return res
        .status(400)
        .json({ msg: "You cannot participate in this quiz again" });

    const participation = await prisma.userParticipateQuiz.create({
      data: {
        userId,
        quizId,
      },
    });
    // add ID to userparticipatequiz
    // update userquestionanswer
    // calc average quiz score
    // add score to list of scores (userquizscore)
    return res.status(201).json({
      msg: "Participation successfully registered",
      data: participation,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

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

export { createParticipate, createQuestionAnswer, createQuiz, createUserScore };
