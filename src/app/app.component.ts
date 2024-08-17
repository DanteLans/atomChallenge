import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './card.component';
import { HeaderComponent } from './header.component';
import { SubHeaderComponent } from './sub-header.component';
import { CardHeaderComponent } from './card-header.component';
import { NewCardComponent } from './new-card.component';
import { SectionComponent } from './section.component';
import { Task } from './types/task.type';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, HeaderComponent,SubHeaderComponent, CardHeaderComponent, NewCardComponent, SectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'tasklist';

  todo:Task[] = [
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

  inqa:Task[] = [
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Design system',
      description: 'Testeo de la nueva funcionalidad'
    },
  ]

  inprogress:Task[] = [
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Design system, for new components',
      description: 'Testeo de la nueva funcionalidad'
    },
  ]

  indone:Task[] = [
    {
      user: 'test',
      dateCreated: new Date(),
      title: 'Create a angular simple repo',
      description: 'Create a new angular web app'
    },
  ]
}
