import axios from "axios";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const seedBasicUsers = async (req, res) => {
    try {
        const { id } = req.user;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    }
}