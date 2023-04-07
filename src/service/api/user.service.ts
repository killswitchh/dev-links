import { API_URLS } from '../../constants';
import type { CreateUserRequest, User } from '../../core/models/user.dto';

import { ApiWrapper } from './../api-wrapper.service';

export const UserService = {
  getUserForEmail(email: string): Promise<User> {
    console.log('fetching user for email', email);
    const url = API_URLS.GET_USERS_BY_EMAIL_URL(email);
    return ApiWrapper.get(url);
  },

  createUser(userRequest: CreateUserRequest): Promise<User> {
    console.log('creating user for request', userRequest);
    const url = API_URLS.CREATE_USER_URL();
    return ApiWrapper.post(url, userRequest);
  },

  async getOrCreateUser(email: string, name: string): Promise<User> {
    let currentUser: User | null = null;
    try {
      currentUser = await UserService.getUserForEmail(email);
    } catch (error) {
      const createUserRequest: CreateUserRequest = {
        name: name,
        email: email,
      };
      currentUser = await UserService.createUser(createUserRequest);
    }
    return currentUser as User;
  },
};

export default UserService;
