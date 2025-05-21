const { InventorManagementService } = require("../services");

async function getAllInventors(req, res) {
  try {
    const inventors = await InventorManagementService.allInventors();
    if (!inventors) {
      return res.status(404).json({
        status: 404,
        message: "Inventors not found",
        result: null
      });
    }
    res.status(200).json({
      status: 200,
      message: "Inventors fetched successfully",
      result: inventors
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      result: error
    });
  }
}

module.exports = {
  getAllInventors
};
