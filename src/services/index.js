const UserService = require("./user.service");
const SessionService = require("./session.service");
const DepartmentService = require("./department.service");
const UserRoleService = require("./userRole.service");
const CategoryService = require("./category.service");
const ItemsService = require("./items.service");
const ModuleService = require("./module.service");
const RoleService = require("./role.service");
const SuppliersService = require("./suppliers.service");
const BatchService = require("./batch.service");
const OrderTypeService = require("./order_type.service");
const OrderOutwardService = require("./order_outward.service");
const OrderOutwardItemService = require("./order_outward_item.service");

module.exports = {
  UserService,
  SessionService,
  DepartmentService,
  UserRoleService,
  CategoryService,
  ItemsService,
  ModuleService,
  RoleService,
  SuppliersService,
  BatchService,
  OrderTypeService,
  OrderOutwardService,
  OrderOutwardItemService
};
