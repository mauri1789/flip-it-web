import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { Deck, DecksSummary } from '../../store.models';
import { Store, select } from "@ngrx/store";
import { Observable } from 'rxjs';
import { loadDecks } from "../../actions/deck.actions";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../elements/dialog/dialog.component';
import { mergeMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
   decksSummary$: Observable<DecksSummary>
   userId: string;
   constructor(
      private deckService:DeckService,
      private store: Store<{decksSummary: DecksSummary}>,
      public dialog: MatDialog
   ) {
      this.decksSummary$ = store.pipe(select('decksSummary'))
      this.userId = "mau"
   }

   ngOnInit() {
      this.store.dispatch(loadDecks({userId: this.userId}))
   }
   addDeck () {
      const dialogRef = this.dialog.open(DialogComponent, {
         width: '250px',
         data: {title: "New Deck", fields: [
            {
               label: "Deck Name",
               multiline: false
            }
         ]}
      });
      dialogRef.afterClosed()
         .pipe(
            map(([deckName] = []) => deckName),
            mergeMap(deckName => this.deckService.createDeck(deckName, this.userId))
         ).subscribe(() => this.store.dispatch(loadDecks({userId: this.userId})))
   }
}
