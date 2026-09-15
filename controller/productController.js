import productModel from '../model/product.js';
import { productFilterSchema, productSchema } from '../utils/validation.js';

export const getAllProducts = async (req, res) => {
  try {
    const { value: filters, error } = productFilterSchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        errors: error.details.map((detail) => detail.message),
      });
    }
    const result = await productModel.getAllProducts(filters);
    const msg = result?.length > 0 ? 'Product found' : 'No product found';
    res.status(200).json({ message: msg, data: result });
  } catch (error) {
    console.error('Error getting all product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { value, error } = productSchema.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
    const result = await productModel.createProduct(value);
    if (result.message) {
      return res.status(500).json({
        message: 'product already exist',
        data: [],
      });
    }
    res.status(201).json({
      message: 'Product created successfully',
      data: {
        productId: result?.insertedId,
      },
    });
  } catch (error) {
    console.error('Error creating new product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { value, error } = productSchema.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
    const result = await productModel.updateProduct(value, id);
    res.status(201).json({
      message: 'Product update successfully',
    });
  } catch (error) {
    console.error('Error creating new product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.getProductById(id);
    const msg = result?.length > 0 ? 'Product found' : 'No product found';
    res.status(result?.length ? 200 : 404).json({ message: msg, data: result });
  } catch (error) {
    console.error('Error creating new product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productModel.deleteProductById(id);
    if (result?.deletedCount <= 0) {
      return res.status(404).json({ message: 'No product found', data: [] });
    }
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error creating new product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
