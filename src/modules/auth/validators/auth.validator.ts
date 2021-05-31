import { ActionParams } from 'core';

export const AuthEmailPasswordRule: ActionParams = {
  email: {
    type: 'email',
    empty: false,
    trim: true
  },
  password: {
    type: 'string',
    empty: false,
    trim: true
  }
};
