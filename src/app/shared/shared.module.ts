import { NgModule } from '@angular/core';
import { 
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbSelectModule
} from '@nebular/theme';

import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { SelectBoxComponent } from './components';
import { PrimengModule } from './primeng.module';


@NgModule({
  declarations: [SelectBoxComponent],
  imports: [
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    }),
    PrimengModule,
    NbSelectModule
  ],
  exports: [
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    SelectBoxComponent
  ]

})
export class SharedModule { }
