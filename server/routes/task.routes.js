const express = require("express");
const { createTask,getTasks,assignedTaskToUser ,getAssignedTask,updateTaskStatus} = require("../controllers/task.controller");
const {isAuthenticated,authorizeRoles}= require("../middleware/auth.middleware");

const router = express.Router();

//manager
router.post("/create",isAuthenticated,authorizeRoles("MANAGER"), createTask);
router.post('/assigned',isAuthenticated,authorizeRoles("MANAGER"), assignedTaskToUser);
//admin
router.get('/',isAuthenticated,authorizeRoles("ADMIN"), getTasks);
//user
router.get('/assigned',isAuthenticated,authorizeRoles("USER"),getAssignedTask );
router.post("/status/:id",isAuthenticated,authorizeRoles("USER"), updateTaskStatus);


module.exports = router;
