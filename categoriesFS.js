const fs = require("fs").promises;

class CategoriesManager {
  constructor(path) {
    this.categories = [];
    this.path = path;
  }
  async addCategory(newCategory) {
    try {
      const categoriesJSON = await fs.readFile(this.path, "utf-8");
      let categoriesParsed = JSON.parse(categoriesJSON || "[]");
      this.categories = categoriesParsed;
      this.categories.push({ categoryName: newCategory });
      await fs.writeFile(this.path, JSON.stringify(this.categories, null, 4));
      return "Categoría agregada.";
    } catch (error) {
      console.log(error);
    }
  }
  async getCategories() {
    let readCategories = await fs.readFile("./categoriesData.json", "utf-8");
    let categoriesParsed = JSON.parse(readCategories);
    this.categories = categoriesParsed;
    console.log("Categorias: ");
    if (this.categories.length > 0) {
      this.categories.forEach(function (categories) {
        console.log(categories.categoryName);
      });
      return this.categories;
    } else {
      console.log("No hay categorías creadas.");
    }
  }
}

module.exports = CategoriesManager;
