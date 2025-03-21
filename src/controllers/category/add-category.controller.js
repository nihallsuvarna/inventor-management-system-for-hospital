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

module.exports = addCategory;
