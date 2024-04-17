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

    const { name, startDate, endDate } = req.body;

    let quiz = await prisma.user.findUnique({
      where: { name: name },
    });

    if (quiz)
      return res
        .status(409)
        .json({ msg: `Quiz with name ${name} already exists` });
    
    if (Object.keys(req.body).length < 3) return res
        .status(400)
        .json({ msg: `Please fill out all fields` })

    // Chooses a random category Id from 9-32 (change this to allow admin to select category)
    let catId = Math.floor(Math.random() * 32) + 9
    let res = await fetch("https://opentdb.com/api.php?amount=10");
    let quizData = await res.json();
    quiz = await prisma.quiz.create({
        data: {
            categoryId: catId
        }
    })

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
