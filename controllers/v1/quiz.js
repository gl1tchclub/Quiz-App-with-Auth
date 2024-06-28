import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createQuiz = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });

    // Only admins can create quiz
    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        error: "Not authorized to create a quiz",
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
        .json({ error: `Quiz with name ${name} already exists` });

    const requiredFields = ["name", "startDate", "endDate"];

    // Check if all required fields are provided
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    let baseUrl = "https://opentdb.com/api.php";
    let queryParams = [];

    if (type) {
      queryParams.push(`type=${type}`);
    }
    if (difficulty) {
      queryParams.push(`difficulty=${difficulty}`);
    }
    if (categoryId) {
      queryParams.push(`category=${categoryId}`);
    }

    if (queryParams.length > 0) {
      baseUrl = `${baseUrl}?amount=10&${queryParams.join("&")}`;
    } else {
      baseUrl = `${baseUrl}?amount=10`;
    }

    const quizFetch = await fetch(baseUrl);
    const json = await quizFetch.json();

    if (json.response_code > 0)
      return res.status(404).json({ error: "No quiz data available. Please adjust your quiz requirements.", url: baseUrl, params: queryParams});

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

    if (!quiz) return res.status(400).json({ error: "Failed to create quiz." });

    const questionData = json.results.map((q) => {
      return {
        quizId: quiz.id,
        question: q.question,
        correctAnswer: q.correct_answer,
        incorrectAnswers: q.incorrect_answers,
      };
    });

    if (questionData.length === 0) {
      await prisma.quiz.delete(quiz.id);
      return res
        .status(400)
        .json({ error: "Failed to make questions for quiz." });
    }

    const quizQuestions = await prisma.question.createMany({
      data: questionData,
    });

    return res.status(201).json({
      msg: "Quiz successfully created",
      data: quiz,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const getQuizzes = async (req, res, include) => {
  try {
    // const type = req.query.type;
    /**let options = {};
    const currentDate = new Date().toISOString();

    // Filter current, past, and all quizzes
    switch (type) {
      case "past":
        options = {
          endDate: { lt: currentDate },
        };
        break;
      case "current":
        options = {
          startDate: { lte: currentDate },
          endDate: { gte: currentDate },
        };
        break;
      case "future":
        options = {
          startDate: { gte: currentDate },
        };
      default:
        options = null;
    }

    //Extract query parameters like filters
    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
    const orderBy = req.query.orderBy;

    const query = {
      where: filters,
    };
    */

    const quizzes = await prisma.quiz.findMany({
      include: {
        questions: true,
        userQuizScores: true,
      },
    });

    if (quizzes.length === 0) {
      return res.status(404).json({ error: "No quizzes found" });
    }

    return res
      .status(200)
      .json({ msg: "Successfully retrieved quizzes", data: quizzes });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const getQuiz = async (req, res, include) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        questions: true,
        userParticipateQuizzes: true,
        userQuestionAnswers: true,
        userQuizScores: true,
      },
    });

    if (!quiz) {
      return res
        .status(404)
        .json({ error: `No quiz with the id: ${req.params.id} found` });
    }

    return res.json({
      msg: `Successfully retrieved quiz: ${req.params.id}`,
      data: quiz,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    // Get logged in user's ID
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        error: "Not authorized to access this route",
      });
    }

    // Get user with ID to delete from parameters
    const removeQuiz = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!removeQuiz) {
      return res
        .status(404)
        .json({ error: `No quiz with the id: ${req.params.id} found` });
    }
    await prisma.quiz.delete({
      where: { id: removeQuiz.id },
    });

    return res.json({
      msg: `Quiz with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export { createQuiz, getQuiz, getQuizzes, deleteQuiz };
