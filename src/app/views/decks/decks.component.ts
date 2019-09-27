import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { Deck, DecksSummary } from '../../store.models';
import { Store, select } from "@ngrx/store";
import { Observable } from 'rxjs';
import { loadDecks } from "../../actions/deck.actions";

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
   decksSummary$: Observable<DecksSummary>
   constructor(
      private deckService:DeckService,
      private store: Store<{decksSummary: DecksSummary}>
   ) {
      this.decksSummary$ = store.pipe(select('decksSummary'))
   }

   ngOnInit() {
      this.store.dispatch(loadDecks({userId: "mau"}))
   }

}
