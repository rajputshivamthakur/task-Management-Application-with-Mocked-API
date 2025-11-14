'use client';

import { useAppSelector } from '@/store/hooks';
import Header from './Header';
import TaskList from '../tasks/TaskList';
import ProtectedRoute from '../auth/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

export default function Dashboard() {
  const { tasks } = useAppSelector((state) => state.tasks);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.todo} pending
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-yellow-400 dark:hover:border-yellow-600 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.inProgress}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently working on
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all duration-200 hover:shadow-lg hover:scale-105 hover:border-green-400 dark:hover:border-green-600 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completed}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.total > 0
                      ? `${Math.round((stats.completed / stats.total) * 100)}% completion`
                      : 'No tasks yet'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Task List */}
            <TaskList />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
