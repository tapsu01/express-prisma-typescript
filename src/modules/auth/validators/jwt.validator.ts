import { ActionParams } from 'core';

export const RefreshTokenRule: ActionParams = {
  refreshToken: {
    type: 'string',
    empty: false,
    trim: true
  }
};
