import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json",
        });
      }
      
      const { email, firstName, lastName, password, username } = req.body;
  
      // Get the authenticated user's id from the Request's user property
      const { id } = req.user;
  
      // Now you will know which authenticated user created which user
      await prisma.user.create({
        data: { email, firstName, lastName, password, username },
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
  
  // ...