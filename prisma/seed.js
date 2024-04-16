import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const seeds = [
  "./data/01-adminSeed.js"
]
const prisma = new PrismaClient()

const main = async () => {
  try {
    for (let i = 0; i < seeds.length; i++) {
      let { name, data } = await import(seeds[i])
      for (let u = 0; u < data.length; u++) {
        const salt = await bcryptjs.genSalt();
        data[u].password = await bcryptjs.hash(data[u].password, salt);
        data[u].avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${data[u].username}`;
        let user = await prisma[name].create({
          data: data[u],
        })
        // here for testing
        delete user.password;
      }
    }

    console.log("Database successfully seeded")

    await prisma.$disconnect() // Disconnect from the database
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1) // Exit the process
  }
}

main()