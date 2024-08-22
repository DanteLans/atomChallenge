import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./features/home/home.component";
import { LoadingComponent } from './shared/components/loading/loading.component';
import {Dialog} from '@angular/cdk/dialog';
import { TaskStore } from './core/services/task.service';
import { LoginComponent } from "./features/login/login.component";
import { TaskFormComponent } from "./shared/components/task-form/task-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, LoadingComponent, LoginComponent, TaskFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  dialog = inject(Dialog);
  service= inject(TaskStore);

  ngOnInit(): void {
    this.service.loadingState$
    .subscribe((value) => {
      if(value) {
        this.openLoading();
      }else {
        this.dialog.closeAll();
      }
    })
  }
  
  openLoading() {
    this.dialog.open(LoadingComponent, {
      minWidth: '300px',
    });
  }
}
