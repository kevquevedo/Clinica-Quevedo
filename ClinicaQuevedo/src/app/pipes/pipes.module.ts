import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesRoutingModule } from './pipes-routing.module';
import { HorapipePipe } from './horaPipe/horapipe.pipe';
import { FiltropipePipe } from './filtroPipe/filtropipe.pipe';
import { DniPipe } from './dniPipe/dni.pipe';
import { FechaPipe } from './fechaPipe/fecha.pipe';
import { HistoriasPipe } from './historiasPipe/historias.pipe';

@NgModule({
  declarations: [
    HorapipePipe,
    FiltropipePipe,
    DniPipe,
    FechaPipe,
    HistoriasPipe
  ],
  exports:[
    HorapipePipe,
    FiltropipePipe,
    DniPipe,
    FechaPipe,
    HistoriasPipe
  ],
  imports: [
    CommonModule,
    PipesRoutingModule
  ]
})
export class PipesModule { }
