import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {PortletHeaderComponent} from './portlet-header.component';
import {PortletBodyComponent} from './portlet-body.component';
import {PortletFooterComponent} from './portlet-footer.component';
import {PortletLableComponent} from './portlet-lable.component';

export interface PortletOptions {
  test?: any;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kt-portlet',
  templateUrl: './kt-portlet.component.html',
  styleUrls: ['./kt-portlet.component.scss'],
})


export class KtPortletComponent implements OnInit {

  // Public properties
  @Input() loading$: Observable<boolean>;
  // portlet extra options
  @Input() options: PortletOptions;
  // portlet root classes
  @Input() class: string;

  @ViewChild('portlet', {static: true}) portlet: ElementRef;

  // portlet lable component template
  @ViewChild(PortletLableComponent, {static: true}) lable: PortletLableComponent;
  // portlet header component template
  @ViewChild(PortletHeaderComponent, {static: true}) header: PortletHeaderComponent;
  // portlet body component template
  @ViewChild(PortletBodyComponent, {static: true}) body: PortletBodyComponent;
  // portlet footer component template
  @ViewChild(PortletFooterComponent, {static: true}) footer: PortletFooterComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
