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
   userData: DecksSummary;
   decks: Deck[];
   constructor(
      private deckService:DeckService,
      private store: Store<{decksSummary: DecksSummary}>
   ) {
      this.decksSummary$ = store.pipe(select('decksSummary'))
   }

   ngOnInit() {
      this.decksSummary$.subscribe(x => console.log(x))
      this.store.dispatch(loadDecks({userId: "mau"}))
      // this.deckService.getUserDecks('mau')
      // .subscribe(({decks, ...decksSummary}) => {
      //    this.userData = decksSummary
      //    this.decks = decks
      // })
   }

}
