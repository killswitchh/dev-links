import type { Prisma, User } from '@prisma/client';
import AppError from '../../core/models/app-error.dto';

import { prisma } from './prisma.service';

export const UserService = {
  async getUserForEmail(email: string): Promise<User> {
    console.log('fetching user for email', email);
    const user = await prisma().user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });
    if (!user) {
      throw new AppError(`User not found for email ${email}`, 400);
    }
    return user;
  },

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    console.log('creating user for request', data);
    return prisma().user.create({
      data,
    });
  },

  async getOrCreateUser(email: string, name: string): Promise<User> {
    let currentUser: User | null = null;
    try {
      currentUser = await UserService.getUserForEmail(email);
    } catch (error) {
      const createUserRequest: Prisma.UserCreateInput = {
        name: name,
        email: email,
      };
      currentUser = await UserService.createUser(createUserRequest);
    }
    return currentUser as User;
  },
};

export default UserService;
