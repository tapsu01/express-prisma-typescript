import prisma from '../../lib/prisma';
import debug from 'debug';
import { CRUD } from '../common/crud.interface';
import { Post } from '@prisma/client';

class PostDbService implements CRUD {
  constructor() {
    // Construct
  }

  async list(limit: number, page: number) {
    const posts = await prisma.post.findMany({
      skip: limit * (page - 1),
      take: limit
    });

    return posts;
  }

  async findById(postId: number) {
    const post = await prisma.post.findFirst({
      where: { id: postId }
    });

    return post;
  }

  async create(resource: Post) {
    const post = await prisma.post.create({
      data: resource
    });

    return post;
  }

  async updateById(postId: number, resource: Post) {
    const post = await prisma.post.update({
      where: { id: postId },
      data: resource
    });

    return post;
  }

  async deleteById(postId: number) {
    return await prisma.post.delete({
      where: { id: postId }
    });
  }
}

export default new PostDbService();
