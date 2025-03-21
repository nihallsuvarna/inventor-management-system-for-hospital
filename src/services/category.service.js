const { Category } = require("../models");

class CategoryService {
  static async getCategoryById(categoryId) {
    const category = await Category.findOne({ where: { id: categoryId } });
    return category;
  }

  static async getCategoryByKey(key) {
    const category = await Category.findOne({ where: { key } });
    return category;
  }

  static async getCategoryByLabel(label) {
    const category = await Category.findOne({ where: { label } });
    return category;
  }

  static async listAllCategories() {
    const categories = await Category.findAll();
    return categories;
  }

  static async createCategory(categoryData) {
    const category = await Category.create(categoryData);
    return category;
  }

  static async updateCategory(categoryId, categoryData) {
    const category = await Category.update(categoryData, {
      where: { id: categoryId }
    });
    return category;
  }

  static async deleteCategory(categoryId) {
    const category = await Category.destroy({
      where: { id: categoryId }
    });
    return category;
  }
}

module.exports = CategoryService;
