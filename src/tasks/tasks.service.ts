import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: this.idCounter++,
      ...createTaskDto,
      completed: false,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const i = this.tasks.findIndex(t => t.id === id);
    if (i === -1) throw new NotFoundException(`Task ${id} not found`);
    this.tasks[i] = { ...this.tasks[i], ...updateTaskDto };
    return this.tasks[i];
  }

  remove(id: number): void {
    const i = this.tasks.findIndex(t => t.id === id);
    if (i === -1) throw new NotFoundException(`Task ${id} not found`);
    this.tasks.splice(i, 1);
  }
}
