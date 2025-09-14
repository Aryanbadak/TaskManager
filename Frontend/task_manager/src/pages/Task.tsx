import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { fetchTasks } from "../features/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Tasks() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Tasks</h2>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default Tasks;