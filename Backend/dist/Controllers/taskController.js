var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Task from "../Models/Task.js";
export const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const task = yield Task.create({ title, description });
        res.status(201).json(task);
    }
    catch (error) {
        console.error("Create Task Error:", error);
        res.status(500).json({ message: "Server error gu", error: error });
    }
});
// Get All Tasks
export const getTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task.findAll();
        res.json(tasks);
    }
    catch (error) {
        console.error("Get Tasks Error:", error);
        res.status(500).json({ message: "Server error hf" });
    }
});
// Update Task
export const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const task = yield Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        yield task.save();
        res.json(task);
    }
    catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Delete Task
export const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield Task.findByPk(id);
        if (!task)
            return res.status(404).json({ message: "Task not found" });
        yield task.destroy();
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({ message: "Server error ty" });
    }
});
//# sourceMappingURL=taskController.js.map