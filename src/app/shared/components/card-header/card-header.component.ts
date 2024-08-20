import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [],
  templateUrl: './card-header.component.html',
  styles: ``
})
export class CardHeaderComponent {
  @Input({ required: true }) title!: string;
}
