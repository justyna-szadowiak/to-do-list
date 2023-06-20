import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() toDoForm !: FormGroup;
  tasks: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  updateId: any;
  isEditEnable = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteTaskInProgress(i: number) {
    this.inProgress.splice(i, 1)
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1)
  }

  editTask(item: Task, i: number) {
    this.toDoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnable = true;
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
  }

  addOnClick(task: Task) {
    this.tasks.push(task)
  }

}
