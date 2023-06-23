import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  toDo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  currentEditTask?: Task;

  constructor() { }

  ngOnInit(): void {  }

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

  createTask(task: Task) {
    this.toDo.push(task);
  }

  deleteTask(taskId: number) {
    this.toDo.splice(taskId);
  }

  edit(task: Task) {
    this.currentEditTask = task;
  }

  updateTask(task: Task) {
    const toDoIndex = this.toDo.findIndex(todoTask => todoTask.id === task.id);
    const inProgressIndex = this.inProgress.findIndex(inProgressTask => inProgressTask.id === task.id);
    const doneIndex = this.done.findIndex(doneTask => doneTask.id === task.id);

    if (toDoIndex !== -1) {
      this.toDo[toDoIndex] = task;
    } else if (inProgressIndex !== -1) {
      this.inProgress[inProgressIndex] = task;
    } else if (doneIndex !== -1) {
      this.done[doneIndex] = task;
    }
  }
}
