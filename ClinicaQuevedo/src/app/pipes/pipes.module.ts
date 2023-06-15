import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesRoutingModule } from './pipes-routing.module';
import { HorapipePipe } from './horaPipe/horapipe.pipe';
import { FiltropipePipe } from './filtroPipe/filtropipe.pipe';
import { DniPipe } from './dniPipe/dni.pipe';

@NgModule({
  declarations: [
    HorapipePipe,
    FiltropipePipe,
    DniPipe
  ],
  exports:[
    HorapipePipe,
    FiltropipePipe,
    DniPipe
  ],
  imports: [
    CommonModule,
    PipesRoutingModule
  ]
})
export class PipesModule { }
