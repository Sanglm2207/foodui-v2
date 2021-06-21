import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KtPortletComponent} from './kt-portlet/kt-portlet.component';
import {PortletHeaderComponent} from './kt-portlet/portlet-header.component';
import {PortletFooterComponent} from './kt-portlet/portlet-footer.component';
import {PortletBodyComponent} from './kt-portlet/portlet-body.component';
import {PortletLableComponent} from './kt-portlet/portlet-lable.component';


@NgModule({
    declarations: [
        KtPortletComponent,
        PortletHeaderComponent,
        PortletBodyComponent,
        PortletFooterComponent,
        PortletLableComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        KtPortletComponent,
        PortletHeaderComponent,
        PortletBodyComponent,
        PortletFooterComponent,
        PortletLableComponent
    ]
})
export class PortletModule {
}
