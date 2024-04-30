import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const seeds = ["./data/01-adminSeed.js", "./data/02-categorySeed.js"];
const prisma = new PrismaClient();

/**
 * Seed any data from the data directory
 */
const main = async () => {
  try {
    // Import data and seed each object
    for (let i = 0; i < seeds.length; i++) {
      let { name, data } = await import(seeds[i]);

      // Change values for admin user properties
      if (name == "user") {
        data.forEach((user) => {
          user.password = bcryptjs.hashSync(
            user.password,
            bcryptjs.genSaltSync(),
          );
          user.avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`;
        });
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
