import { ObjectId } from 'mongodb';
import { getConnection } from '../db/connect.js';

class ProductModel {
  constructor(
    name,
    sku,
    description,
    categoryId,
    price,
    quantity,
    supplier,
    status,
  ) {
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.categoryId = categoryId;
    this.price = price;
    this.quantity = quantity;
    this.supplier = supplier;
    this.status = status;
  }

  static async getDB() {
    const db = await getConnection();
    return db.collection('product');
  }

  static async createProduct(payload) {
    const collection = await this.getDB();
    const now = new Date();
    const result = await collection.insertOne({
      ...payload,
      createdAt: now,
      updatedAt: now,
    });
    return result;
  }

  static async getAllProducts(filters = {}) {
    const db = await this.getDB();
    const query = {};
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.sku) {
      query.sku = { $regex: filters.sku, $options: 'i' };
    }
    if (filters.categoryId) {
      query.categoryId = filters.categoryId;
    }
    if (filters.supplier) {
      query.supplier = { $regex: filters.supplier, $options: 'i' };
    }
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.price = {};
      if (filters.minPrice !== undefined) query.price.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) query.price.$lte = filters.maxPrice;
    }
    if (
      filters.minQuantity !== undefined ||
      filters.maxQuantity !== undefined
    ) {
      query.quantity = {};
      if (filters.minQuantity !== undefined) {
        query.quantity.$gte = filters.minQuantity;
      }
      if (filters.maxQuantity !== undefined) {
        query.quantity.$lte = filters.maxQuantity;
      }
    }
    const result = await db.find(query).toArray();
    return result;
  }

  // update product
  static async updateProduct(payload, id) {
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

  // get product by Id
  static async getProductById(categoryId) {
    const collection = await this.getDB();
    const result = collection.find({ _id: new ObjectId(categoryId) }).toArray();
    return result;
  }

  // delete product by Id
  static async deleteProductById(categoryId) {
    const collection = await this.getDB();
    const result = collection.deleteOne({ _id: new ObjectId(categoryId) });
    return result;
  }
}

export default ProductModel;
