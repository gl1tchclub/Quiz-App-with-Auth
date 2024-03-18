import { PrismaClient } from "@prisma/client";
import { register, login } from "auth.js";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password, username, role } = req.body;

    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    /**
     * If the authenticated user is not an admin, they can
     * not create a new record
     */
    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    await register({
      data: { email, firstName, lastName, password, username, role },
    });

    const newUsers = await prisma.user.findMany({
      include: {
        departments: true,
      },
    });

    return res.status(201).json({
      msg: "User successfully created",
      data: newUsers,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    return res.json({ data: users });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};