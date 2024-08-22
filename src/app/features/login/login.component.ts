import { Component, OnInit } from '@angular/core';
import { TaskStore } from '../../core/services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/types/task.type';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: `
  button:disabled{
    background-color: rgb(6 6 6 / 15%);
    @apply opacity-40;
  }`
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private service: TaskStore) { }

  ngOnInit(): void {
    this.service.userState({} as User);
  }

  onlogin(): void {
    this.service.getUser(this.userForm.value as User);
  }
}
