import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task?: Task;
  @Input() isDone: boolean = false;
  @Output() delete = new EventEmitter<void>();
  @Output() editTask = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void { }

  emitToDelete() {
    this.delete.emit();
  }

  emitToEdit() {
    this.editTask.emit(this.task);
  }
}
