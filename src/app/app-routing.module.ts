import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecksComponent } from './views/decks/decks.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CardsComponent } from "./views/cards/cards.component";


const routes: Routes = [
  { path: 'decks', component: DecksComponent },
  { path: 'deck/:deckId', component: CardsComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
