import debug from 'debug';
import prisma from '../../lib/prisma';
import { User } from '@prisma/client';
import { CRUD } from '../common/crud.interface';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UserDBService implements CRUD {
  select: any;

  constructor() {
    this.select = {
      id: true,
      email: true,
      name: true,
      mobile: true,
      avatarUrl: true,
      registeredAt: true,
      lastLogin: true,
      intro: true,
      profile: true,
      role: true,
      posts: true
    };
  }

  async list(limit: number, page: number) {
    const users = await prisma.user.findMany({
      select: this.select,
      skip: (page - 1) * limit,
      take: limit
    });

    return users;
  }

  async findById(userId: number) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: this.select
    });

    return user;
  }

  async deleteById(userId: number) {
    const user = await prisma.user.delete({
      where: { id: userId },
      select: this.select
    });
    return user;
  }

  async create(resource: User) {
    const user = await prisma.user.create({
      select: { id: true },
      data: resource
    });
    return user;
  }

  async updateById(userId: number, user: User) {
    return await prisma.user.update({
      where: { id: userId },
      data: user,
      select: this.select
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
      where: { email },
      select: { id: true }
    });
  }
}

export default new UserDBService();
