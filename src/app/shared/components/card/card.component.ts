import { Component, Input } from '@angular/core';
import { Task } from '../../../types/task.type';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {
  @Input({ required: true }) item!: Task;
}
