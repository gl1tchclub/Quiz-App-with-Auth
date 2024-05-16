import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { data } from "../../prisma/data/03-basicSeed";
const prisma = new PrismaClient();

/**
 * Seed basic users from a fetched endpoint when an admin accesses this route
 * @returns an error if unauthorized or server error
 */
const seedBasicUsers = async (req, res) => {
  try {
    // Ensure only admin user can access route
    const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    let newUserDataArray = data().data;

    // Check if users have already been seeded so that seeding only runs once.
    const seededUser = await prisma.user.findUnique({
      where: { username: newUserDataArray[0].username },
    });
    if (seededUser)
      return res
        .status(410)
        .json({ msg: "Resource no longer available. Users already seeded" });

    // Seed each new user with a hashed password and avatar
    newUserDataArray.forEach((u) => {
      u.password = bcryptjs.hashSync(u.password, bcryptjs.genSaltSync());
      u.avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${u.username}`;
    });
    await prisma.user.createMany({
      data: newUserDataArray,
    });
    return res.status(201).json({ msg: "Basic Users Created", data: newUserDataArray })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { seedBasicUsers };
