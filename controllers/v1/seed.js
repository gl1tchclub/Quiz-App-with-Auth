import axios from "axios";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seedBasicUsers = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    let { name, data } = await import("../../prisma/data/03-basicSeed");
    data.data.forEach((user) => {
        user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());
        user.avatar =
            `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`;
    })
    await prisma.user.createMany({
        data: data.data,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
