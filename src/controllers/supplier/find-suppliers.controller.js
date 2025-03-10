const { Supplier } = require("../../models");

async function findSuppliers(req, res) {
  try {
    const label = req.query.supplier;
    const supplier = await Supplier.findOne({ where: { label } });
    if (!supplier) {
      return res.status(404).json({
        status: 404,
        message: "Supplier not found",
        result: null
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Supplier found",
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

module.exports = findSuppliers;
