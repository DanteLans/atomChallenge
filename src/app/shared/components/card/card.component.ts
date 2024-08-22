import { Component, Input } from '@angular/core';
import { Task } from '../../types/task.type';
import { CustomDatePipe } from "../../../core/pipes/custom-date.pipe";
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CustomDatePipe, CommonModule],
  templateUrl: './card.component.html',
  styles: `
  p{
    display: inline-block;
    word-break: break-word;
  }
  `
})
export class CardComponent {
  @Input({ required: true }) item!: Task;

  constructor(private dialog: Dialog) { }

  editTask(): void {
    this.dialog.open(TaskFormComponent, {
      minWidth: '300px',
      data: { isNewTask: false, task: this.item }
    });
  }
}
