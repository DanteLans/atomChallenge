import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SectionComponent } from '../../shared/components/section/section.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { GroupedTasks } from '../../shared/types/task.type';
import { SubHeaderComponent } from '../../shared/components/sub-header/sub-header.component';
import { TaskStore } from '../../core/services/task.service';
import introJs from 'intro.js';
import { IntroService } from '../../core/services/intro.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SectionComponent, SubHeaderComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit, AfterViewInit {
  data = {} as GroupedTasks;
  title = 'tasklist';
  constructor(private service: TaskStore, private intro: IntroService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.service.state$.subscribe((data)=> {
      this.data = this.service.groupByStatus(data);
    })
  }

  ngAfterViewInit(): void {
    if (this.route.snapshot.queryParamMap.get('tour') == 'true') {
      this.startTour();
    }
  }

  startTour() {
    this.intro.stepTwo();
  }
}
