const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

const { createTask, viewTasks, findTaskById, updateTask, deleteTask } = require("../controller/task");


router.post("/create", auth, createTask);

router.get("/",auth,viewTasks) ;

router.get("/:id",auth,findTaskById) ;

router.put("/:id/edit",auth,updateTask) ;

router.delete("/:id",auth,deleteTask) ;

module.exports = router;
