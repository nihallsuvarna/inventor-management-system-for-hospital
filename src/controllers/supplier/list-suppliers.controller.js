const { Supplier } = require("../../models");

async function listSuppliers(req, res) {
  try {
    const supplier = await Supplier.findAll();
    if (!supplier) {
      return res.status(404).json({
        status: 404,
        message: "Supplier not found",
        result: null
      });
    }
    return res.status(200).json({
      status: 200,
      message: "All Suppliers found",
      result: supplier
    });
  } catch (err) {
    console.log("Something went wrong while getting Supplier", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while getting Supplier",
      result: err
    });
  }
}

module.exports = listSuppliers;