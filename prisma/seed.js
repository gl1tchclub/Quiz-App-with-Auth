import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const seeds = ["./data/01-adminSeed.js", "./data/02-categorySeed.js"];
const prisma = new PrismaClient();

const main = async () => {
  try {
    for (let i = 0; i < seeds.length; i++) {
      let { name, data } = await import(seeds[i]);
      if (name == "user") {
        for (let user = 0; user < data.length; user++) {
          const salt = bcryptjs.genSaltSync();
          data[user].password = bcryptjs.hashSync(data[user].password, salt);
          data[user].avatar =
            `https://api.dicebear.com/7.x/adventurer/svg?seed=${data[user].username}`;
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
