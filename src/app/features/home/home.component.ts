import { Component } from '@angular/core';
import { SectionComponent } from '../../shared/components/section/section.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Task } from '../../types/task.type';
import { SubHeaderComponent } from '../../shared/components/sub-header/sub-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SectionComponent, SubHeaderComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  title = 'tasklist';

  todo: Task[] = [
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Nueva tareas I',
      description: 'Test nueva tarea'
    },
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Creacion de api',
      description: 'creacion del api con items basicos'
    },
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Creacion de nuevos componentes',
      description: 'Se crearon todos los componentes de una forma basica'
    }
  ]

  inqa: Task[] = [
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Design system',
      description: 'Testeo de la nueva funcionalidad'
    },
  ]

  inprogress: Task[] = [
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Design system, for new components',
      description: 'Testeo de la nueva funcionalidad'
    },
  ]

  indone: Task[] = [
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Create a angular simple repo',
      description: 'Create a new angular web app'
    },
  ]
}
