import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterCredentials, LoginResponse } from '@/types';
import { loadState, saveState, removeState } from '@/lib/localStorage';

const AUTH_STORAGE_KEY = 'auth';

// Load initial state from localStorage
const persistedAuth = loadState<{ token: string; user: any }>(AUTH_STORAGE_KEY);

const initialState: AuthState = {
  user: persistedAuth?.user || null,
  token: persistedAuth?.token || null,
  isAuthenticated: !!persistedAuth?.token,
  loading: false,
  error: null,
};

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Registration failed');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        
        // Persist to localStorage
        saveState(AUTH_STORAGE_KEY, {
          user: action.payload.user,
          token: action.payload.token,
        });
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        
        // Persist to localStorage
        saveState(AUTH_STORAGE_KEY, {
          user: action.payload.user,
          token: action.payload.token,
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        
        // Remove from localStorage
        removeState(AUTH_STORAGE_KEY);
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;