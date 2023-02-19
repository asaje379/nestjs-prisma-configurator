export type CreateTodoDtoPriority = 'IMMEDIATE' | 'NORMAL';
export interface CreateTodoDto {
  label: string;
  completed?: boolean;
  priority: CreateTodoDtoPriority;
  duration: number;
}

export interface TodoSerializer {
  id: number;
  createdAt: string;
  updatedAt: string;
  label: string;
  completed: boolean;
  priority: string;
  duration: number;
}

export type UpdateTodoDtoPriority = 'IMMEDIATE' | 'NORMAL';
export interface UpdateTodoDto {
  label?: string;
  completed?: boolean;
  priority?: UpdateTodoDtoPriority;
  duration: number;
}

export type CreateTodoDtoPriority = 'IMMEDIATE' | 'NORMAL';
export interface CreateTodoDto {
  label: string;
  completed?: boolean;
  priority: CreateTodoDtoPriority;
  duration: number;
}

export interface TodoSerializer {
  id: number;
  createdAt: string;
  updatedAt: string;
  label: string;
  completed: boolean;
  priority: string;
  duration: number;
}

export type UpdateTodoDtoPriority = 'IMMEDIATE' | 'NORMAL';
export interface UpdateTodoDto {
  label?: string;
  completed?: boolean;
  priority?: UpdateTodoDtoPriority;
  duration: number;
}

