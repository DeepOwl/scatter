import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { ScatterComponent } from './scatter/scatter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScatterGameComponent } from './scatter-game/scatter-game.component';

@NgModule({
  declarations: [
    AppComponent,
    ScatterComponent,
    DashboardComponent,
    ScatterGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }