'use client';

import { Task } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300';
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300';
      case 'completed':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-500/30 hover:bg-gray-500/20 hover:border-gray-500/50 transition-all duration-300';
      case 'medium':
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300';
      case 'high':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-2 border-border hover:border-primary/50 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 transition-all duration-300 group-hover:translate-x-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
              {task.title}
            </CardTitle>
            <CardDescription className="mt-1 group-hover:text-foreground/80 transition-colors duration-300">
              {task.description}
            </CardDescription>
          </div>
          <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(task)}
              className="h-8 w-8 hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-destructive hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:scale-110"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={`${getStatusColor(task.status)} px-3 py-1 rounded-full font-medium hover:scale-110`}>
            {getStatusLabel(task.status)}
          </Badge>
          <Badge className={`${getPriorityColor(task.priority)} px-3 py-1 rounded-full font-medium hover:scale-110`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground ml-auto group-hover:text-foreground transition-colors duration-300">
            <Clock className="h-3 w-3 mr-1 group-hover:animate-pulse" />
            {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
