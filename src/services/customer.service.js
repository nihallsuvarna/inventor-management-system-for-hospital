const { User, UserRole } = require("../models");

class CustomerService {
  static async getAllCustomers() {
    const customers = await UserRole.findAll({
      where: { role_id: 5 },
      include: [
        {
          model: User,
          as: "customer"
        }
      ]
    });
    return customers;
  }

  static async existingCustomer(customerId) {
    const customer = await User.findOne({ where: { id: customerId } });
    return customer;
  }

  static async createCustomer(customerData) {
    const customer = await User.create(customerData);
    return customer;
  }

  static async updateCustomer(customerId, customerData) {
    const customer = await User.update(customerData, {
      where: { id: customerId }
    });
    return customer;
  }

  static async deleteCustomer(customerId) {
    const customer = await User.destroy({
      where: { id: customerId }
    });
    return customer;
  }
}

module.exports = CustomerService;
