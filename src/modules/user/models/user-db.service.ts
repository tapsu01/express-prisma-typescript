import debug from 'debug';
import { PrismaClient, User } from '@prisma/client';
import { CRUD } from '../../common/crud.interface';

const log: debug.IDebugger = debug('app:in-memory-dao');
const prisma = new PrismaClient();

class UserDBService implements CRUD {
  async list(limit: number, page: number) {
    const users = await prisma.user.findMany({
      include: {
        posts: true
      },
      skip: page * limit,
      take: limit
    });

    return users;
  }

  async findById(userId: number) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    return user;
  }

  async deleteById(userId: number) {
    const user = await prisma.user.delete({
      where: { id: userId }
    });
    return user;
  }

  async create(user: User) {
    return await prisma.user.create({
      data: user
    });
  }

  async updateById(userId: number, user: User) {
    return await prisma.user.update({
      where: { id: userId },
      data: user
    });
  }

  async patchById(userId: number, user: User) {
    return await prisma.user.update({
      where: { id: userId },
      data: user
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email }
    });
  }
}

export default new UserDBService();
