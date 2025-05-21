const express = require("express");
const { addRole, addDepartment } = require("../controllers/admin.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/role/add-role", auth, addRole);
router.post("/department/add-department", auth, addDepartment);

module.exports = router;