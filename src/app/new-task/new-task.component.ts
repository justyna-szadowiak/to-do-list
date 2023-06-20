import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../models/task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  @Output() newTask = new EventEmitter<Task>();
  @Output() updateExistingTask = new EventEmitter<string>();

  toDoForm !: FormGroup;
  isEditEnable = false;
  updateId: any;
  tasks!: Task[];

  constructor(private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      id: [''],
      title: [''],
      item: ['', Validators.required]
    })
  }

  updateTask() {
    this.tasks[this.updateId].description = this.toDoForm.value.item;
    this.tasks[this.updateId].done = false;
    this.toDoForm.reset();
    this.updateId = undefined;
    this.isEditEnable = false;
  }

  addTask() {
    this.newTask.emit({
      id: this.toDoForm.value.id,
      name: this.toDoForm.value.title,
      description: this.toDoForm.value.item,
      done: false
    });
    this.toDoForm.reset();
  }

  // updateTask(task: Task, index: number) {
  //   const dialogRefUpdate = this.dialog.open()
  // }
}
