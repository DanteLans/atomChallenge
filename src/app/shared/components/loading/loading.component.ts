import { Component } from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './loading.component.html',
  styles: `
  `
})
export class LoadingComponent {

}
