import { Router } from "express";
import { getAllTask,createNewTask,getTaskById,deleteTaskById,updateTaskById } from "../controllers/tasks.js";

const router = Router()

router.route("/").get(getAllTask).post(createNewTask)
router.route("/:id").get(getTaskById).patch(updateTaskById).delete(deleteTaskById)


export default router