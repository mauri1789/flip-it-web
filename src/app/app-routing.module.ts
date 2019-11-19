import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecksComponent } from './views/decks/decks.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CardsComponent } from "./views/cards/cards.component";
import { SessionResolver } from "./resolvers/session.resolver";
import { UserGuard } from './guards/user.guard';


const routes: Routes = [
  {
    path: '',
    canActivateChild: [UserGuard],
    children: [
      { path: 'decks', component: DecksComponent },
      { path: 'deck/:deckId', component: CardsComponent },
      { path: 'dashboard', component: DashboardComponent }
    ],
    resolve: {
      session: SessionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
