const express = require("express");
const { addRole, addDepartment } = require("../controllers/admin.controller");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/role/add-role", auth, addRole);
router.post("/department/add-department", auth, addDepartment);

// Sessions
// GET /sessions: Get all active sessions (likely for administrative purposes).

// GET /sessions/:id: Get a single session by ID.

// DELETE /sessions/:id: Invalidate/delete a session.

// GET /sessions/user/:userId: Get sessions for a specific user.

module.exports = router;
