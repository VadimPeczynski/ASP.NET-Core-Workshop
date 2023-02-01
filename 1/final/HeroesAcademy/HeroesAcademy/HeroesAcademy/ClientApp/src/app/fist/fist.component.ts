import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-fist',
  templateUrl: './fist.component.html',
  styleUrls: ['./fist.component.css'],
})
export class FistComponent implements OnChanges {
  fistWidth = 0;
  @Input() strength: number = 0;
  @Output() notify = new EventEmitter<string>();
  constructor() {}

  ngOnChanges(): void {
    this.fistWidth = (60 / 5) * this.strength;
  }

  onClick(): void {
    this.notify.emit(`Pięści ${this.strength} kliknięte`);
  }
}
