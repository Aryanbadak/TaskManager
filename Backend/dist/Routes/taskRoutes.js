import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../Controllers/taskController.js";
const router = Router();
router.post("/", createTask);
router.get("/get", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
export default router;
//# sourceMappingURL=taskRoutes.js.map