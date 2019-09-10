import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecksComponent } from './views/decks/decks.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'decks', component: DecksComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
