import { ActionParams } from 'core';

export const CreatePostRule: ActionParams = {
  parentId: {
    type: 'number',
    positive: true,
    integer: true,
    optional: true
  },
  title: {
    type: 'string',
    min: 3,
    max: 255
  },
  metaTitle: {
    type: 'string',
    max: 100,
    optional: true
  },
  slug: {
    type: 'string',
    max: 100,
    optional: true
  },
  summary: {
    type: 'string',
    optional: true
  },
  content: {
    type: 'string',
    optional: true
  },
  createdAt: {
    type: 'date',
    default: () => new Date()
  },
  published: {
    type: 'boolean',
    optional: true,
    default: false
  },
  publishedAt: {
    type: 'date',
    optional: true,
    default: () => new Date()
  },
  authorId: {
    type: 'number',
    positive: true,
    integer: true
  },
  $$strict: true
};
