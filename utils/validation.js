import joi from 'joi';

export const categorySchema = joi
  .object({
    name: joi.string().trim().min(1).max(20).required(),
    description: joi.string().trim().max(500).allow('').optional(),
  })
  .unknown(false);

export const productSchema = joi
  .object({
    name: joi.string().trim().min(1).max(100).required(),
    description: joi.string().trim().max(1000).allow('').optional(),
    sku: joi.string().trim().min(1).max(50).required(),
    categoryId: joi.string().hex().length(24).required(),
    price: joi.number().positive().precision(2).required(),
    quantity: joi.number().integer().min(0).required(),
    supplier: joi.string().trim().min(1).max(100).required(),
    status: joi.string().trim().valid('in-stock', 'out-of-stock').required(),
  })
  .unknown(false);

export const categoryFilterSchema = joi
  .object({
    name: joi.string().trim().min(1).max(20).optional(),
    description: joi.string().trim().min(1).max(500).optional(),
  })
  .unknown(false);

export const productFilterSchema = joi
  .object({
    name: joi.string().trim().min(1).max(100).optional(),
    sku: joi.string().trim().min(1).max(50).optional(),
    categoryId: joi.string().hex().length(24).optional(),
    supplier: joi.string().trim().min(1).max(100).optional(),
    status: joi.string().trim().valid('in-stock', 'out-of-stock').optional(),
    minPrice: joi.number().min(0).precision(2).optional(),
    maxPrice: joi.number().min(joi.ref('minPrice')).precision(2).optional(),
    minQuantity: joi.number().integer().min(0).optional(),
    maxQuantity: joi.number().integer().min(joi.ref('minQuantity')).optional(),
  })
  .unknown(false);
