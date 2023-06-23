import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task';
import { IdManagerService } from '../id-manager.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  @Input() set editTask(value: Task | undefined) {
    if (value) {
      this.toDoForm = this.fb.group({
        id: value.id,
        title: value.title,
        description: value.description,
        done: value.done
      })
      this.isEditEnable = true;
    }
  };
  @Output() newTask = new EventEmitter<Task>();
  @Output() updateExistingTask = new EventEmitter<Task>();

  toDoForm !: FormGroup;
  isEditEnable = false;
  updateId: any;

  constructor(
    private fb: FormBuilder,
    private idManagerService: IdManagerService
  ) {}

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      id: [],
      title: [''],
      description: ['', Validators.required],
      done: [false]
    })
  }

  addTask() {
    const task: Task = {
      id: this.idManagerService.lastTaskId,
      title: this.toDoForm.value.title,
      description: this.toDoForm.value.description,
      done: this.toDoForm.value.done
    }

    this.newTask.emit(task);
    this.toDoForm.reset();
    this.idManagerService.lastTaskId++;
  }

  updateTask() {
    const task: Task = {
      id: this.toDoForm.value.id,
      title: this.toDoForm.value.title,
      description: this.toDoForm.value.description,
      done: this.toDoForm.value.done
    }
    this.updateExistingTask.emit(task);
    this.toDoForm.reset();
    this.isEditEnable = false;
  }
}
