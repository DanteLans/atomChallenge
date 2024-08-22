import { NgClass } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskStore } from '../../../core/services/task.service';
import { state } from '@angular/animations';
import { Task } from '../../types/task.type';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './task-form.component.html',
  styles: `
  button:disabled{
    background-color: rgb(6 6 6 / 15%);
    @apply opacity-40;
  }
  textarea.ng-invalid:not(.ng-untouched), input.ng-invalid:not(.ng-untouched){
    @apply border-solid border-2 border-red-500/50;
  }
  .disabled-div{
    @apply opacity-40;
  }
  `
})
export class TaskFormComponent implements OnInit {
  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(300)]),
    status: new FormControl(false)
  });

  constructor(private service: TaskStore, @Inject(DIALOG_DATA) public data: { isNewTask: boolean, task?: Task }) { }

  ngOnInit(): void {
    if (!this.data.isNewTask) {
      this.taskForm.patchValue({
        title: this.data.task?.title,
        description: this.data.task?.description,
        status: this.data.task?.status === 'done'
      });
    }
    if (this.data.task?.status === 'done') {
      this.taskForm.controls.status.disable();
    }
  }

  saveTask(): void {
    const user = this.service.user;
    const task = {
      description: this.taskForm.value.description!,
      title: this.taskForm.value.title!,
      status:
        Boolean(this.taskForm.value.status) === false ?
          this.data.isNewTask ?
            'todo' : this.data.task?.status : 'done',
      user: user.email,
      ...(!this.data.isNewTask && { dateCreated: this.data.task?.dateCreated }),
      ...(!this.data.isNewTask && { id: this.data.task?.id })
    } as unknown as Task
    this.service[this.data.isNewTask ? 'createTask' : 'updateTask'](task);
  }

  deleteTask(): void {
    const task = { id: this.data.task?.id } as unknown as Task
    this.service.deleteTask(task);
  }
}
