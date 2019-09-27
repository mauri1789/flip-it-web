import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { deckReducer } from "./reducers/deck.reducer";
import { DeckEffects } from "./effects/deck.effects";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DecksComponent } from './views/decks/decks.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

let MATERIAL_MODULES = [
  MatMenuModule,
  MatButtonModule,
  MatDividerModule
]

@NgModule({
  declarations: [
    AppComponent,
    DecksComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MATERIAL_MODULES,
    StoreModule.forRoot({
      decksSummary: deckReducer
    }),
    EffectsModule.forRoot([
      DeckEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
