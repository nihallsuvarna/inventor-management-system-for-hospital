const { Supplier } = require("../models");

class SuppliersService {
  static async getSupplierById(supplierId) {
    const supplier = await Supplier.findOne({
      where: { id: supplierId }
    });
    return supplier;
  }

  static async getSupplierByLabel(label) {
    const supplier = await Supplier.findOne({ where: { label } });
    return supplier;
  }

  static async listAllSuppliers() {
    const suppliers = await Supplier.findAll();
    return suppliers;
  }

  static async createSupplier(supplierData) {
    const supplier = await Supplier.create(supplierData);
    return supplier;
  }

  static async updateSupplier(supplierId, supplierData) {
    const supplier = await Supplier.update(supplierData, {
      where: { id: supplierId }
    });
    return supplier;
  }

  static async deleteSupplier(supplierId) {
    const supplier = await Supplier.destroy({
      where: { id: supplierId }
    });
    return supplier;
  }
}

module.exports = SuppliersService;
