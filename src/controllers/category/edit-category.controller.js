const { Category } = require("../../models");

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

    const category = await Category.findOne({ where: { key: key } });

    // Check if Category exists
    if (!category) {
      return res.status(501).json({
        status: 501,
        message: "Category does not exists",
        result: null
      });
    }

    // Update Category
    const updatedCategory = await category.set({
      label: label,
      description: description
    });

    const response = await updatedCategory.save();

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

module.exports = editCategory;
