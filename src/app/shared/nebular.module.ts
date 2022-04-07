import { NgModule } from "@angular/core";
import {
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule, 
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbTooltipModule,
    NbUserModule,
  } from '@nebular/theme';
  

const modules = [
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule, 
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbTooltipModule,
]

@NgModule({
    imports: [...modules],
    exports: [...modules]
})
export class NebularModule {}