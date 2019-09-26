import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { DeckService } from '../../services/deck.service';
import { Deck, DecksSummary } from '../../store.models';
import { loadDecks } from "../../actions/deck.actions";

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
   userData: DecksSummary;
   decks: Deck[];
   constructor(
      private deckService:DeckService,
      private store:Store<{}>
   ) { }

   ngOnInit() {
      console.log("before dispatch")
      this.store.dispatch(loadDecks({userId: "mau"}))
      // this.deckService.getUserDecks('mau')
      // .subscribe(({decks, ...decksSummary}) => {
      //    this.userData = decksSummary
      //    this.decks = decks
      // })
   }

}
