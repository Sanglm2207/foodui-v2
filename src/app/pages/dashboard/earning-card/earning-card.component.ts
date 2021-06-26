import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-earning-card',
  templateUrl: './earning-card.component.html',
  styleUrls: ['./earning-card.component.scss']
})
export class EarningCardComponent {

  flipped = false;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
