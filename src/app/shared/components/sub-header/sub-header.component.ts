import { Component } from '@angular/core';
import { TaskStore } from '../../../core/services/task.service';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [],
  templateUrl: './sub-header.component.html',
  styles: ``
})
export class SubHeaderComponent {

  constructor(private dialog: Dialog) {}
  
  addNewTask(): void {
    this.dialog.open(TaskFormComponent, {
      minWidth: '300px',
      data: {isNewTask: true}
    });
  }
}
