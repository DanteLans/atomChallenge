import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TaskStore } from '../../core/services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/types/task.type';
import { IntroService } from '../../core/services/intro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: `
  button:disabled{
    background-color: rgb(6 6 6 / 15%);
    @apply opacity-40;
  }`,

})
export class LoginComponent implements OnInit, AfterViewInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private service: TaskStore, private intro: IntroService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.userState({} as User);
  }

  ngAfterViewInit(): void {
    if (this.route.snapshot.queryParamMap.get('tour') == 'true') {
      this.startTour();
    }
  }

  onlogin(): void {
    this.service.getUser(this.userForm.value as User);
  }

  startTour() {
    this.intro.stepOne(this.userForm, this.onlogin);
  }
}
