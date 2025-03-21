const { CategoryService } = require("../../services");

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

module.exports = getAllCategory;
