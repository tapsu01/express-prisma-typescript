import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class User {
  async getAll() {
    const users = await prisma.user.findMany({
      include: {
        posts: true
      }
    });
    return users;
  }
}

export = User;
