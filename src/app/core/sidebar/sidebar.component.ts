import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToDoListService } from 'src/app/services/to-do-list.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  todoForm!: FormGroup;
  updateIndex!: number;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder, private todoList: ToDoListService) {
    this.todoList.editSignal.subscribe((data: [number, Task]) => {
      this.todoForm.controls['item'].setValue(data[1].description);
      this.updateIndex = data[0];
      this.isEditEnabled = true;
    });
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
  }

  addTask(): void {
    this.todoList.tasks.push(
      {
        description: this.todoForm.value.item,
      }
    );
    this.todoList.updateLocalStorage();
    this.todoForm.reset();
  }

  editTask(): void {
    this.todoList.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.todoList.updateLocalStorage();
    this.todoForm.reset();
    this.isEditEnabled = false;
  }

}
