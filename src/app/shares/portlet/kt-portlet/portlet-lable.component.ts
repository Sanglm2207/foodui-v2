import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kt-portlet-lable',
  template: `
    <div class="card-title mb-0" [hidden]="noTitle">
      <ng-content *ngIf="!title" select="[ktPortletTitle]"></ng-content>
      <h3 *ngIf="title" class="card-label" [innerHTML]="title"></h3>
    </div>
    <div class="card-text">
      <ng-content *ngIf="!description" select="[ktPortletText]"></ng-content>
      <p *ngIf="description" class="card-text" [innerHTML]="description"></p>
      <ng-content *ngIf="!router" select="[ktPortletRouter]"></ng-content>
    </div>
  `,
})

export class PortletLableComponent implements OnInit {
  // a simple title text
  @Input() title: string;

  // a simple description text
  @Input() description: string;

  // a simple router text
  @Input() router: string;

  // remove title container
  @Input() noTitle: boolean;

  @HostBinding('class') classes = 'card-body';


  ngOnInit(): void {
  }
}
