import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDragRelease,
  CdkDragExit,
} from '@angular/cdk/drag-drop'; import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { StatusTask, Task } from '../../types/task.type';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardComponent } from '../card/card.component';
import { NewCardComponent } from '../new-card/new-card.component';
import { TaskStore } from '../../../core/services/task.service';

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
  
  
  .list.cdk-drop-list-dragging .example-box:not(.cdk-drag-placeholder) {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
  }`
})
export class SectionComponent {
  @Input({ required: true }) title!: string;
  @Input() data!: Task[];
  @Input() idList!: string;

  constructor(private service: TaskStore) { }

  drop(event: CdkDragDrop<Task[]>) {
    const newState = event.container.id;
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data || [event.item.data] ,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if (event.item.data.status !== event.container.id) {
      event.item.data.status = newState;
      this.updateTask(event.item.data);
    }
  }

  updateTask(item: Task) {
    this.service.updateTask({ ...item});
  }
}
