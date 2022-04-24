import { Component, OnInit } from '@angular/core';
import { ToDoListService } from 'src/app/services/to-do-list.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-main-todo',
  templateUrl: './main-todo.component.html',
  styleUrls: ['./main-todo.component.scss']
})
export class MainTodoComponent implements OnInit {

  constructor(private todoList: ToDoListService) { }

  ngOnInit(): void {
    this.todoList.tasks = JSON.parse(localStorage.getItem('tasks') || "");
    this.todoList.inProgress = JSON.parse(localStorage.getItem('inProgress') || "");
    this.todoList.done = JSON.parse(localStorage.getItem('done') || "");
  }

  getTasks(): Task[] {
    return this.todoList.tasks;
  }

  getTasksLength(): number {
    return this.todoList.tasks.length;
  }

  getInProgress(): Task[] {
    return this.todoList.inProgress;
  }

  getInProgressLength(): number {
    return this.todoList.inProgress.length;
  }

  getDone(): Task[] {
    return this.todoList.done;
  }

  getDoneLength(): number {
    return this.todoList.done.length;
  }

  deleteTask(index: number): void {
    this.todoList.tasks.splice(index, 1);
    this.todoList.updateLocalStorage();
  }

  deleteInProgress(index: number): void {
    this.todoList.inProgress.splice(index, 1);
    this.todoList.updateLocalStorage();
  }

  deleteDone(index: number): void {
    this.todoList.done.splice(index, 1);
    this.todoList.updateLocalStorage();
  }

  editTask(item: Task, index: number): void {
    this.todoList.editSignal.emit([index, item]);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.todoList.updateLocalStorage();
  }

}
