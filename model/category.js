import { ObjectId } from 'mongodb';
import { getConnection } from '../db/connect.js';

class CategoryModel {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  static async getDB() {
    const db = await getConnection();
    return db.collection('category');
  }

  // create new category option
  static async createCategory(payload) {
    const collection = await this.getDB();
    const category = await collection.findOne({ name: payload.name });
    if (category?._id) {
      return {
        message: 'category already exist',
      };
    }
    const now = new Date();
    const result = collection.insertOne({
      ...payload,
      createdAt: now,
      updatedAt: now,
    });
    return result;
  }

  // update category option
  static async updateCategory(payload, id) {
    const collection = await this.getDB();
    const { createdAt: _createdAt, updatedAt: _updatedAt, ...fields } = payload;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...fields,
          updatedAt: new Date(),
        },
      },
    );
    return result;
  }

  // get all categories
  static async getAllCategories(filters = {}) {
    const collection = await CategoryModel.getDB();
    const query = {};
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.description) {
      query.description = { $regex: filters.description, $options: 'i' };
    }
    const result = await collection.find(query).toArray();
    return result;
  }

  // get category by Id
  static async getCategoryById(categoryId) {
    const collection = await CategoryModel.getDB();
    const result = await collection
      .find({ _id: new ObjectId(categoryId) })
      .toArray();
    return result;
  }

  // delete category by Id
  static async deleteCategoryById(categoryId) {
    const collection = await CategoryModel.getDB();
    const result = await collection.deleteOne({
      _id: new ObjectId(categoryId),
    });
    return result;
  }
}

export default CategoryModel;
