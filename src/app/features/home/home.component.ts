import { Component, OnInit } from '@angular/core';
import { SectionComponent } from '../../shared/components/section/section.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { GroupedTasks } from '../../shared/types/task.type';
import { SubHeaderComponent } from '../../shared/components/sub-header/sub-header.component';
import { TaskStore } from '../../core/services/task.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SectionComponent, SubHeaderComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  data = {} as GroupedTasks;
  title = 'tasklist';
  constructor(private service: TaskStore) {}

  ngOnInit(): void {
    this.service.state$.subscribe((data)=> {
      this.data = this.service.groupByStatus(data);
    })
  }
}
