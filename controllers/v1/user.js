import { PrismaClient } from "@prisma/client";
// import { register, login } from "auth.js";
import { checkPrivilege } from "./resources.js";

const prisma = new PrismaClient();

//admin
const seedBasicUser = async (req, res) => {
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

// With authorized access only, fetch a data for all users
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

// Fetch a data for a singular user by a given ID with authorization
const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });
    let findUser = {};

    if (user.role == "BASIC_USER") {
      // if uuid sent by basic user is their own ID, send the res
      if (req.params.uuid === id) {
        return res.json({
          data: user,
        });
      }
      // send error msg if not their own ID
      else {
        return res.status(403).json({
          msg: `Not authorized to access other user data`,
        });
      }
    }

    // if admin, store data of any given user ID
    else {
      findUser = await prisma.user.findUnique({
        where: { id: req.params.uuid },
      });

      if (!findUser) {
        return res
          .status(404)
          .json({ msg: `No User with the id: ${req.params.uuid} found` });
      }
    }

    return res.json({
      data: findUser,
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

    // Get logged in user data and user to update
    const user = await prisma.user.findUnique({ where: { id: req.user.uuid } });

    let putUser = await prisma.user.findUnique({
      where: { id: req.params.uuid },
    });

    // If user data is successfully retrieved, check if the user can be updated based on the logged in user's privileges
    if (putUser) {
      if (
        user.id === putUser.id ||
        (user.role == "ADMIN_USER" && putUser.role == "BASIC_USER")
      ) {
        user = await prisma.user.update({
          where: { id: req.params.uuid },
          data: { ...req.body },
        });
        return res.json({
          msg: `${req.params.username}'s information successfully updated`,
          data: user,
        });
      } else {
        return res.status(403).json({
          msg: `Not authorized to update this user`,
        });
      }
    }

    return res
      .status(404)
      .json({ msg: `No user with the id: ${req.params.uuid} found` });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

// Delete a specific user by the ID
const deleteUser = async (req, res) => {
  try {
    // Get logged in user's ID
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    if (user.role == "BASIC_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    // Get user with ID to delete from parameters
    const removeUser = await prisma.user.findUnique({
      where: {
        id: req.params.uuid,
      },
    });

    if (removeUser) {
      // Can't delete own account nor remove an admin user
      if (user.id === removeUser.id || removeUser.role === "ADMIN_USER") {
        return res.status(403).json({ msg: `Cannot delete user` });
      }
      await prisma.user.delete({
        where: { id: removeUser.id },
      });

      return res.json({
        msg: `User with the id: ${req.params.uuid} successfully deleted`,
      });
    }
    return res
      .status(404)
      .json({ msg: `No user with the id: ${req.params.uuid} found` });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { seedBasicUser, getUsers, getUser, deleteUser, updateUser };
