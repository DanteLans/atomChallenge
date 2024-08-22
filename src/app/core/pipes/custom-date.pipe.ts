import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../shared/types/task.type';
@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {
  
  transform(value: Pick<Task, 'dateCreated'>, ...args: unknown[]): Date {
    return new Date(value.dateCreated._seconds * 1000);
  }

}
