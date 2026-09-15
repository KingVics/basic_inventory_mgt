import CategoryModel from '../model/category.js';
import { categoryFilterSchema, categorySchema } from '../utils/validation.js';

export const getAllCategories = async (req, res) => {
  try {
    const { value: filters, error } = categoryFilterSchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        errors: error.details.map((detail) => detail.message),
      });
    }
    const result = await CategoryModel.getAllCategories(filters);
    const msg = result?.length > 0 ? 'Category found' : 'No category found';
    res.status(200).json({ message: msg, data: result });
  } catch (error) {
    console.error('Error creating new category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { value, error } = categorySchema.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
    const result = await CategoryModel.createCategory(value);
    console.log(result, 'result');
    if (result.message) {
      return res.status(500).json({
        message: 'Category already exist',
        data: [],
      });
    }
    res.status(201).json({
      message: 'Category created successfully',
      data: {
        categoryId: result?.insertedId,
      },
    });
  } catch (error) {
    console.error('Error creating new category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, error } = categorySchema.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
    const result = await CategoryModel.updateCategory(value, id);
    res.status(201).json({
      message: 'Category update successfully',
    });
  } catch (error) {
    console.error('Error creating new category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CategoryModel.getCategoryById(id);
    const msg = result?.length > 0 ? 'Category found' : 'No category found';
    res.status(result?.length ? 200 : 404).json({ message: msg, data: result });
  } catch (error) {
    console.error('Error creating new category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CategoryModel.deleteCategoryById(id);
    if (result?.deletedCount <= 0) {
      return res.status(404).json({ message: 'No category found', data: [] });
    }
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error creating new category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
