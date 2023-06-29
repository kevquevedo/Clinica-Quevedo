import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformesRoutingModule } from './informes-routing.module';
import { HomeInformesComponent } from './home-informes/home-informes.component';
import { GraficoEspecialidadComponent } from './grafico-especialidad/grafico-especialidad.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GraficoDiaComponent } from './grafico-dia/grafico-dia.component';
import { GraficoFinalizadosComponent } from './grafico-finalizados/grafico-finalizados.component';
import { GraficoSolicitadosComponent } from './grafico-solicitados/grafico-solicitados.component';
import { GraficoLogsComponent } from './grafico-logs/grafico-logs.component';

@NgModule({
  declarations: [
    HomeInformesComponent,
    GraficoEspecialidadComponent,
    GraficoDiaComponent,
    GraficoFinalizadosComponent,
    GraficoSolicitadosComponent,
    GraficoLogsComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    NgxChartsModule,
  ]
})
export class InformesModule { }
