import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TasksState, Task, CreateTaskDto, UpdateTaskDto } from '@/types';
import { RootState } from './store';

const MOCK_API_TOKEN = 'mock-jwt-token-12345';

const buildAuthHeaders = (token?: string | null) => ({
  Authorization: `Bearer ${token || MOCK_API_TOKEN}`,
});

const sortTasksByCreatedAt = (tasks: Task[]) =>
  [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch('/api/tasks', {
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        return rejectWithValue('Failed to fetch tasks');
      }

      const data = await response.json();
      return data.tasks;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: CreateTaskDto, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...buildAuthHeaders(token),
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        return rejectWithValue('Failed to create task');
      }

      const data = await response.json();
      return data.task;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (taskData: UpdateTaskDto, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const { id, ...updates } = taskData;

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...buildAuthHeaders(token),
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        return rejectWithValue('Failed to update task');
      }

      const data = await response.json();
      return data.task;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: buildAuthHeaders(token),
      });

      if (!response.ok) {
        return rejectWithValue('Failed to delete task');
      }

      return taskId;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TasksState['filter']>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = sortTasksByCreatedAt(action.payload);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks = sortTasksByCreatedAt([action.payload, ...state.tasks]);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          state.tasks = sortTasksByCreatedAt(state.tasks);
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, clearError } = tasksSlice.actions;
export default tasksSlice.reducer;
