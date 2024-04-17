import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const seeds = ["./data/01-adminSeed.js", "./data/02-categorySeed.js"];
const prisma = new PrismaClient();

const main = async () => {
  try {
    for (let i = 0; i < seeds.length; i++) {
      let { name, data } = await import(seeds[i]);
      if (name == "user") {
        for (let u = 0; u < data.length; u++) {
          const salt = await bcryptjs.genSalt();
          data[u].password = await bcryptjs.hash(data[u].password, salt);
          data[u].avatar =
            `https://api.dicebear.com/7.x/adventurer/svg?seed=${data[u].username}`;
        }
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
