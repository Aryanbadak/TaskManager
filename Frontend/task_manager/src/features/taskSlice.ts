import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";


interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  editingTask: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  editingTask: null,
};

// Async Thunks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const res = await API.get("/tasks/get");
    return res.data;
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "response" in err &&
      err.response &&
      typeof (err as { response: { data?: { message?: string } } }).response.data?.message === "string"
    ) {
      return thunkAPI.rejectWithValue(
        (err as { response: { data: { message: string } } }).response.data.message
      );
    }
    return thunkAPI.rejectWithValue("Failed to fetch tasks");
  }
});

// Add Task
export const addTask = createAsyncThunk(
  "tasks/",
  async (taskData: { title: string; description: string }, thunkAPI) => {
    try {
      console.log("adding task:" + taskData.title, taskData.description);
      const res = await API.post("/tasks", { "title": taskData.title, "description": taskData.description });
      return res.data; 
    } catch (err: unknown) {
      console.log("add task error:" + err);
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response &&
        typeof (err as { response: { data?: { message?: string } } }).response.data?.message === "string"
      ) {
        return thunkAPI.rejectWithValue(
          (err as { response: { data: { message: string } } }).response.data.message
        );
      }
      return thunkAPI.rejectWithValue("Failed to add task");
    }
  }
);

// Update Task
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, title, description }: { id: number; title: string; description: string }, thunkAPI) => {
    try {
      const res = await API.put(`/tasks/${id}`, { title, description });
      return res.data; 
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response &&
        typeof (err as { response: { data?: { message?: string } } }).response.data?.message === "string"
      ) {
        return thunkAPI.rejectWithValue(
          (err as { response: { data: { message: string } } }).response.data.message
        );
      }
      return thunkAPI.rejectWithValue("Failed to edit task");
    }
  }
);

//  Delete Task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number, thunkAPI) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      return taskId; 
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response &&
        typeof (err as { response: { data?: { message?: string } } }).response.data?.message === "string"
      ) {
        return thunkAPI.rejectWithValue(
          (err as { response: { data: { message: string } } }).response.data.message
        );
      }
      return thunkAPI.rejectWithValue("Failed to delete task");
    }
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setEditingTask: (state, action) => {
      state.editingTask = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // addTask
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // editTask
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.editingTask = null;
      })

      // deleteTask
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
export const { setEditingTask } = taskSlice.actions;