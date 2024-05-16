import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { categoryData } from "./data/02-categorySeed.js";
import { seedData } from "./data/01-adminSeed.js";

let data = [];
let name = "";
const prisma = new PrismaClient();

/**
 * Seed any data from the data directory
 */
const main = async () => {
  try {
    // Import data and seed each object
    for (let i = 0; i < 2; i++) {
      if (i == 1) {
        data = categoryData;
        name = "category";
      }

      // Change values for admin user properties
      if (i == 0) {
        seedData.forEach((user) => {
          user.password = bcryptjs.hashSync(
            user.password,
            bcryptjs.genSaltSync(),
          );
          user.avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`;
        });
        data = seedData;
        name = "user";
      }
      await prisma[name].createMany({
        data: data,
      });
    }

    console.log("Database successfully seeded");

    await prisma.$disconnect(); // Disconnect from the database
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1); // Exit the process
  }
};

main();
