import { http, HttpResponse } from 'msw';
import { mockUser, mockToken, setMockTasks, addMockUser, findUserByUsername, findUserByEmail, loadTasksForUser, getUserIdFromToken, mockUsers } from './data';
import { Task, LoginCredentials, RegisterCredentials, CreateTaskDto, UpdateTaskDto } from '@/types';

const BASE_URL = '/api';

const isAuthorized = (request: Request) => {
  const authHeader = request.headers.get('Authorization');
  return !!authHeader && authHeader.startsWith('Bearer mock-jwt-token');
};

// Get user ID from authorization header
const getUserIdFromRequest = (request: Request): string | null => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  return getUserIdFromToken(token);
};

export const handlers = [
  // Auth endpoints
  http.post(`${BASE_URL}/auth/register`, async ({ request }) => {
    const credentials = await request.json() as RegisterCredentials;
    
    console.log('[MSW] Register request received:', { 
      username: credentials.username, 
      email: credentials.email 
    });
    
    // Validate input
    if (!credentials.username || !credentials.email || !credentials.password) {
      return HttpResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    if (findUserByUsername(credentials.username)) {
      console.log('[MSW] Username already exists');
      return HttpResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }
    
    // Check if email already exists
    if (findUserByEmail(credentials.email)) {
      console.log('[MSW] Email already exists');
      return HttpResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
    };
    
    addMockUser(newUser);
    
    console.log('[MSW] User registered successfully');
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    
    // Generate user-specific token
    const userToken = `mock-jwt-token-${newUser.id}`;
    
    return HttpResponse.json({
      user: userWithoutPassword,
      token: userToken,
    }, { status: 201 });
  }),

  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    const credentials = await request.json() as LoginCredentials;
    
    console.log('[MSW] Login request received:', credentials);
    
    // Find user by username
    const user = findUserByUsername(credentials.username);
    
    if (!user) {
      console.log('[MSW] User not found');
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password
    if (user.password !== credentials.password) {
      console.log('[MSW] Invalid password');
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    console.log('[MSW] Credentials valid - returning success');
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    
    // Generate user-specific token
    const userToken = `mock-jwt-token-${user.id}`;
    
    return HttpResponse.json({
      user: userWithoutPassword,
      token: userToken,
    }, { status: 200 });
  }),

  http.post(`${BASE_URL}/auth/logout`, () => {
    return HttpResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  }),

  http.get(`${BASE_URL}/auth/me`, ({ request }) => {
    if (!isAuthorized(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return HttpResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      return HttpResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    const { password, ...userWithoutPassword } = user;
    return HttpResponse.json({ user: userWithoutPassword }, { status: 200 });
  }),

  // Task endpoints
  http.get(`${BASE_URL}/tasks`, ({ request }) => {
    if (!isAuthorized(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return HttpResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Load tasks for this specific user
    const userTasks = loadTasksForUser(userId);
    
    return HttpResponse.json({ tasks: userTasks }, { status: 200 });
  }),

  http.post(`${BASE_URL}/tasks`, async ({ request }) => {
    if (!isAuthorized(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return HttpResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Load current user's tasks
    const userTasks = loadTasksForUser(userId);
    
    const taskData = await request.json() as CreateTaskDto;
    
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTasks = [...userTasks, newTask];
    setMockTasks(userId, updatedTasks);
    
    return HttpResponse.json({ task: newTask }, { status: 201 });
  }),

  http.put(`${BASE_URL}/tasks/:id`, async ({ request, params }) => {
    if (!isAuthorized(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return HttpResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Load current user's tasks
    const userTasks = loadTasksForUser(userId);
    
    const { id } = params;
    const updates = await request.json() as Partial<CreateTaskDto>;
    
    const taskIndex = userTasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      );
    }
    
    const updatedTask: Task = {
      ...userTasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    const newTasks = [...userTasks];
    newTasks[taskIndex] = updatedTask;
    setMockTasks(userId, newTasks);
    
    return HttpResponse.json({ task: updatedTask }, { status: 200 });
  }),

  http.delete(`${BASE_URL}/tasks/:id`, ({ request, params }) => {
    if (!isAuthorized(request)) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return HttpResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Load current user's tasks
    const userTasks = loadTasksForUser(userId);
    
    const { id } = params;
    const taskIndex = userTasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      );
    }
    
    const updatedTasks = userTasks.filter(task => task.id !== id);
    setMockTasks(userId, updatedTasks);
    
    return HttpResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  }),
];