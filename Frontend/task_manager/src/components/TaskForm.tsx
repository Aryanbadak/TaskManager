import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,RootState } from "../app/Store";
import { addTask,editTask,setEditingTask } from "../features/taskSlice";

const TaskForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const editingTask = useSelector((state: RootState) => state.tasks.editingTask);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

   if (editingTask) {
      dispatch(editTask({ id: editingTask.id, title, description }));
    } else {
      dispatch(addTask({ title, description }));
    }
    setTitle("");
    setDescription("");
    
  };

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleCancel = () => {
    dispatch(setEditingTask(null));
    setTitle("");
    setDescription("");
  };


  return (
    <div className="card p-3 shadow rounded mb-3">
      <h4 className="mb-3">{editingTask ? "Edit Task" : "Add Task"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;