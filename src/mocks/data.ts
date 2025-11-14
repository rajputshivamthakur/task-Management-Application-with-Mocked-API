import { Task, User } from '@/types';

const TASKS_STORAGE_KEY = 'mockTasks';
const USERS_STORAGE_KEY = 'mockUsers';

// Default initial tasks (only for demo user)
const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Setup Project',
    description: 'Initialize the task management application with React and TypeScript',
    status: 'completed',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Create login page and protected routes with MSW',
    status: 'completed',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Build Task Dashboard',
    description: 'Create the main dashboard with task list and CRUD operations',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '4',
    title: 'Add Dark Mode',
    description: 'Implement dark mode toggle with localStorage persistence',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Write Documentation',
    description: 'Create comprehensive README with setup instructions',
    status: 'todo',
    priority: 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get user-specific tasks key
const getTasksKey = (userId: string) => `${TASKS_STORAGE_KEY}_${userId}`;

// Load tasks for a specific user from localStorage
export const loadTasksForUser = (userId: string): Task[] => {
  if (typeof window === 'undefined') {
    // For demo user, return default tasks; for others, return empty
    return userId === '1' ? defaultTasks : [];
  }
  
  try {
    const stored = localStorage.getItem(getTasksKey(userId));
    if (stored) {
      const parsed = JSON.parse(stored) as Task[];
      // Validate that it's an array
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading tasks from localStorage:', err);
  }
  
  // If no stored tasks, initialize with defaults for demo user, empty for others
  const initialTasks = userId === '1' ? defaultTasks : [];
  if (typeof window !== 'undefined') {
    localStorage.setItem(getTasksKey(userId), JSON.stringify(initialTasks));
  }
  return initialTasks;
};

// Save tasks for a specific user to localStorage
export const saveTasksForUser = (userId: string, tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(getTasksKey(userId), JSON.stringify(tasks));
    } catch (err) {
      console.error('Error saving tasks to localStorage:', err);
    }
  }
};

// In-memory data store for MSW
const defaultUsers: Array<User & { password: string }> = [
  {
    id: '1',
    username: 'test',
    email: 'test@example.com',
    password: 'test123',
  },
];

// Lazy initialization function to avoid build-time issues
const initializeUsers = (): Array<User & { password: string }> => {
  if (typeof window === 'undefined') {
    return defaultUsers;
  }
  
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Array<User & { password: string }>;
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading users from localStorage:', err);
  }
  
  return defaultUsers;
};

export let mockUsers: Array<User & { password: string }> = initializeUsers();

// Get the default mock user (for backward compatibility)
export const getMockUser = (): User & { password: string } => {
  if (mockUsers.length > 0) {
    return mockUsers[0];
  }
  // Fallback to default user if mockUsers is empty
  return {
    id: '1',
    username: 'test',
    email: 'test@example.com',
    password: 'test123',
  };
};

export const mockUser = getMockUser();

export const mockToken = 'mock-jwt-token-12345';

// Helper functions for user management
export const addMockUser = (user: User & { password: string }) => {
  mockUsers.push(user);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
    } catch (err) {
      console.error('Error saving users to localStorage:', err);
    }
  }
};

export const findUserByUsername = (username: string) => {
  return mockUsers.find(u => u.username === username);
};

export const findUserByEmail = (email: string) => {
  return mockUsers.find(u => u.email === email);
};

// Get current user ID from token (helper function)
export const getUserIdFromToken = (token: string | null): string | null => {
  if (!token) return null;
  // Token format: mock-jwt-token-{userId}
  const match = token.match(/mock-jwt-token-(\d+)/);
  return match ? match[1] : null;
};

// Initialize tasks - will be loaded per user
export let mockTasks: Task[] = [];

// Set tasks for a specific user
export const setMockTasks = (userId: string, tasks: Task[]) => {
  mockTasks = tasks;
  saveTasksForUser(userId, tasks);
};