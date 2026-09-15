import express from 'express';
import {
  getAllProductById,
  getAllProducts,
  createProduct,
  deleteProductById,
  updateProduct,
} from '../controller/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getAllProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProductById);

export default router;
