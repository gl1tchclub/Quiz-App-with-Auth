import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const { name, region, country } = req.body;

    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    /**
     * If the authenticated user is not an admin, they can
     * not create a new record
     */
    if (user.role !== "ADMIN_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    await prisma.user.create({
      data: { name, region, country, userId: id },
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