import express from 'express';
import {
  getAllCategories,
  getAllCategoryById,
  createCategory,
  deleteCategoryById,
  updateCategory,
} from '../controller/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getAllCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategoryById);

export default router;
