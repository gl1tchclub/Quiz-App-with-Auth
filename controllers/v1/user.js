import { PrismaClient } from "@prisma/client";
import { register, login } from "auth.js";

const prisma = new PrismaClient();

//admin
const createUser = async (req, res) => {
  try {
    //const { email, firstName, lastName, password, username, role } = req.body;

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

    // fetch to github gist

    // res => createMany
    // await register({
    //   data: { email, firstName, lastName, password, username, role },
    // });

    const newUsers = await prisma.user.findMany();

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

//admin
const getUsers = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

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

// Fetch a data for a singular user by a given ID
const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: `No User with the id: ${req.params.id} found` });
    }

    return res.json({
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// Update a selected user by their ID
const updateUser = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json.",
      });
    }

    let user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: `No user with the id: ${req.params.id} found` });
    }

    user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `User with the id: ${req.params.id} successfully updated`,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// Delete a specific user by the ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    const removeUser = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!removeUser) {
      return res
        .status(404)
        .json({ msg: `No user with the id: ${req.params.id} found` });
    }

    await prisma.removeUser.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `User with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};



export {
  createUser,
  getUsers,
  getUser,
};