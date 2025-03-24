const { CategoryService } = require("../../services");

async function addCategory(req, res) {
  try {
    const { label, description = "", key } = req.body;

    if (!label || !key) {
      return res.status(400).json({
        status: 400,
        message: "Label and Key are required",
        result: null
      });
    }

    const category = await CategoryService.getCategoryByKey(key);

    if (category) {
      return res.status(401).json({
        status: 401,
        message: "Key should be unique",
        result: null
      });
    }

    const newCategory = await CategoryService.createCategory({
      label,
      description,
      key
    });

    res.status(200).json({
      status: 200,
      message: "Category Added Successfully",
      result: newCategory
    });
  } catch (err) {
    console.log("Something went wrong while adding category", err);
    res.status(501).json({
      status: 501,
      message: "Something went wrong while adding category",
      result: err
    });
  }
}

async function editCategory(req, res) {
  try {
    const { label, description, key } = req.body;

    // Check the input

    if (label.trim() === "") {
      return res.status(401).json({
        status: 401,
        message: "Label cannot be empty",
        result: null
      });
    }

    const category = await CategoryService.getCategoryByKey(key);

    // Check if Category exists
    if (!category) {
      return res.status(501).json({
        status: 501,
        message: "Category does not exists",
        result: null
      });
    }

    // Update Category
    const response = await CategoryService.updateCategory(category.id, {
      label: label,
      description: description
    });

    return res.status(201).json({
      status: 201,
      message: "Category Updated Successfully",
      result: response
    });
  } catch (err) {
    console.log("Something went wrong while uploading the category", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while uploading the category",
      result: err
    });
  }
}

async function getAllCategory(req, res) {
  try {
    // fetch data
    const category = await CategoryService.listAllCategories();
    console.log(category, "category");

    if (!category) {
      return res.status(401).json({
        status: 401,
        message: "Something went wrong",
        result: null
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Category Fetched Successfully",
      result: category
    });
  } catch (err) {
    console.log("Something went wrong while fetching Category", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while fetching Category",
      result: err
    });
  }
}

module.exports = {
  addCategory,
  editCategory,
  getAllCategory
};
