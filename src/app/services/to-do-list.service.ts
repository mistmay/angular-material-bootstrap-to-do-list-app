import { Injectable, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  @Output() editSignal: EventEmitter<[number, Task]> = new EventEmitter();
  tasks: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor() { }

  updateLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('inProgress', JSON.stringify(this.inProgress));
    localStorage.setItem('done', JSON.stringify(this.done));
  }

}
