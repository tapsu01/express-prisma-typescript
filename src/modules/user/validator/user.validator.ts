import { ActionParams } from 'core';

export const UserEmailRule: ActionParams = {
  email: {
    type: 'email',
    empty: false,
    trim: true
  }
};
