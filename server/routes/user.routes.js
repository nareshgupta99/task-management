const express = require("express");
const { createUser,assignedRoleToUser ,getUsers} = require("../controllers/user.controller");
const {isAuthenticated,authorizeRoles}= require("../middleware/auth.middleware")

const router = express.Router();

router.post("/create",isAuthenticated,authorizeRoles("ADMIN"), createUser);
router.post("/assigned-role",isAuthenticated,authorizeRoles("ADMIN"), assignedRoleToUser);
router.get("/users",isAuthenticated,authorizeRoles("ADMIN"), getUsers);


module.exports = router;
