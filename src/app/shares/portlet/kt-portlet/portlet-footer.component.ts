import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'kt-portlet-footer',
    template: `
		<ng-content></ng-content>`
})

export class PortletFooterComponent implements OnInit{
    // Public properties
    @HostBinding('class') classList = 'card-footer';
    @Input() class: string;

    /**
     * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
     */

    /**
     * On init
     */
    ngOnInit() {
        if (this.class) {
            this.classList += ' ' + this.class;
        }
    }
}
