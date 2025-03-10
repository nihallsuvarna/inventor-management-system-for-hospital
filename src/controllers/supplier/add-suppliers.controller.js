const { Supplier } = require("../../models");

async function addSuppliers(req, res) {
  try {
    const {
      label,
      contact_info,
      address,
      category_id,
      postal_code,
      country,
      email
    } = req.body;

    // check if supplier already exists
    const checkSupplier = await Supplier.findOne({ where: { label } });
    if (checkSupplier) {
      return res.status(404).json({
        status: 404,
        message: "Supplier already exists",
        result: null
      });
    }

    // Add supplier
    const supplier = await Supplier.create({
      label,
      contact_info,
      address,
      category_id,
      postal_code,
      country,
      email
    });
    if (!supplier) {
      return res.status(404).json({
        status: 404,
        message: "Supplier not found",
        result: null
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Supplier added",
      result: supplier
    });
  } catch (err) {
    console.log("Something went wrong while adding Supplier", err);
    return res.status(501).json({
      status: 501,
      message: "Something went wrong while adding Supplier",
      result: err
    });
  }
}

module.exports = addSuppliers;
