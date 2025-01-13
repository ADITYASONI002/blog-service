import joi from 'joi';

export const blogSchema = joi.object({
  title: joi.string().trim().strict(false).min(10).max(100).required(),
  content: joi.string().trim().strict(false).min(50).required(),
  authorId: joi.number().required(),
});

export const blogUpdateSchema = joi.object({
  title: joi.string().trim().strict(false).min(10).max(100).required(),
  content: joi.string().trim().strict(false).min(50).required(),
});

export const querySchema = joi.object({
  count: joi.number().default(10).max(100).optional(),
  page: joi.number().default(0).optional(),
  orderBy: joi.string().trim().strict(false).default('createdAt').optional(),
  sort: joi
    .string()
    .trim()
    .strict(false)
    .valid('ASC', 'DESC')
    .default('DESC')
    .optional(),
  search: joi.string().trim().strict(false).optional(),
});
