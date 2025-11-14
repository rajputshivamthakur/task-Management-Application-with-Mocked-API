export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'todo' | 'in-progress' | 'completed';
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: Task['status'];
  priority: Task['priority'];
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
  id: string;
}