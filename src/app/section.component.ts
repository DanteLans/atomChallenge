import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop'; import { SubHeaderComponent } from './sub-header.component';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import { NewCardComponent } from './new-card.component';
import { Task } from './types/task.type';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [SubHeaderComponent, CardComponent, CardHeaderComponent, NewCardComponent, CdkDropList, CdkDrag],
  templateUrl: './section.component.html',
  styles: `.cdk-drag-placeholder {
    opacity: 0;
  }
  
  .cdk-drag-animating {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }
  
  .list:last-child {
    border: none;
  }
  
  .list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }`
})
export class SectionComponent {
  @Input({ required: true }) title!: string;
  @Input() data!: Task[];
  @Input() idList!: string;

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
    console.log('From  -', event.previousContainer.id, event.previousContainer.data);
    console.log('To  -', event.container.id, event.container.data);
  }
}
