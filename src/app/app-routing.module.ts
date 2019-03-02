import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScatterComponent } from './scatter/scatter.component';
import { ScatterGameComponent } from './scatter-game/scatter-game.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: '', redirectTo: '/scatter', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'scatter/:id', component: ScatterGameComponent },
  { path: 'scatter', component: ScatterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
