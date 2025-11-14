'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTasks, deleteTask, setFilter } from '@/store/tasksSlice';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { Plus, ListTodo } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TaskList() {
  const dispatch = useAppDispatch();
  const { tasks, loading, filter } = useAppSelector((state) => state.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await dispatch(deleteTask(taskId));
    }
  };

  const handleCreateNew = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getTaskCount = (status: string) => {
    if (status === 'all') return tasks.length;
    return tasks.filter((task) => task.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs
          value={filter}
          onValueChange={(value) => dispatch(setFilter(value as any))}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="all"
              className="border-2 data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-950 dark:data-[state=active]:text-blue-300"
            >
              All <span className="ml-1 text-xs">({getTaskCount('all')})</span>
            </TabsTrigger>
            <TabsTrigger 
              value="todo"
              className="border-2 data-[state=active]:border-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-700 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-300"
            >
              To Do <span className="ml-1 text-xs">({getTaskCount('todo')})</span>
            </TabsTrigger>
            <TabsTrigger 
              value="in-progress"
              className="border-2 data-[state=active]:border-yellow-500 data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700 dark:data-[state=active]:bg-yellow-950 dark:data-[state=active]:text-yellow-300"
            >
              In Progress <span className="ml-1 text-xs">({getTaskCount('in-progress')})</span>
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="border-2 data-[state=active]:border-green-500 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-950 dark:data-[state=active]:text-green-300"
            >
              Done <span className="ml-1 text-xs">({getTaskCount('completed')})</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Button 
          onClick={handleCreateNew} 
          className="w-full sm:w-auto border-2 border-green-600 bg-green-600 text-white hover:bg-green-700 hover:border-green-700 dark:border-green-600 dark:bg-green-700 dark:hover:bg-green-800 dark:hover:border-green-800"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {loading && tasks.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ListTodo className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            {filter === 'all'
              ? "Get started by creating your first task"
              : `No tasks with status "${filter}"`}
          </p>
          {filter === 'all' && (
            <Button 
              onClick={handleCreateNew}
              className="border-2 border-green-600 bg-green-600 text-white hover:bg-green-700 hover:border-green-700 dark:border-green-600 dark:bg-green-700 dark:hover:bg-green-800 dark:hover:border-green-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Task
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <TaskForm task={selectedTask} open={isFormOpen} onClose={handleCloseForm} />
    </div>
  );
}
