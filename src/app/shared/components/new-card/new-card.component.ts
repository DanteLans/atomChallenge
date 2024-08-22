import { Component } from '@angular/core';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-new-card',
  standalone: true,
  imports: [],
  templateUrl: './new-card.component.html',
  styles: ``
})
export class NewCardComponent {
  constructor(private dialog: Dialog) {}
  
  addNewTask(): void {
    this.dialog.open(TaskFormComponent, {
      minWidth: '300px',
      data: {isNewTask: true}
    });
  }
}
