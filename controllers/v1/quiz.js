import { PrismaClient } from "@prisma/client";
// import { checkPrivilege } from "./resources.js";

const prisma = new PrismaClient();

const createQuiz = async (req, res) => {
  const { id } = req.user;

  const user = await prisma.user.findUnique({ where: { id: id } });

  if (user.role == "BASIC_USER") {
    return res.status(403).json({
      msg: "Not authorized to create a quiz",
    });
  }

  
};
