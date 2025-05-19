const express = require("express");
const router = express.Router();
const {
  addPermission,
  getPermissionByRoleId,
  listAllPermissions,
  updatePermission
} = require("../controllers/permission");

router.post("/add-permission", addPermission);
router.get("/get-permission-by-role-id/:role_id", getPermissionByRoleId);
router.get("/permission-list", listAllPermissions);
router.put("/update-permission/:id", updatePermission);

module.exports = router;
