import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { mergeMap, map, tap, first, filter } from "rxjs/operators";
import { Observable, zip, of } from 'rxjs';
import { DialogComponent } from '../elements/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from "../../services/card.service";
import { CardsSummary, Card } from '../../store.models';
import { loadCards } from '../../actions/card.actions';

@Component({
   selector: 'app-cards',
   templateUrl: './cards.component.html',
   styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
   cardsSummary$: Observable<CardsSummary>
   deckId$: Observable<string>;
   userId:string;
   constructor(
      private route: ActivatedRoute,
      private cardService: CardService,
      public dialog: MatDialog,
      private store: Store<{cardsSummary: CardsSummary}>
   ) {
      this.userId = 'mau'
      this.deckId$ = this.route.paramMap.pipe(
         map((params:ParamMap) => params.get('deckId')),
         first()
      )
      this.cardsSummary$ = store.pipe(select('cardsSummary'))
   }

   ngOnInit() {
      this.loadCardList().subscribe()
   }
   deleteCard (card: Card) {
      let [,cardId] = card.sk.split(":")
      let [,deckId] = card.pk.split(":")
      this.cardService.deleteCard(cardId, deckId)
         .pipe(
            mergeMap(() => this.loadCardList())
         )
         .subscribe()
   }
   loadCardList() {
      return (
         this.deckId$.pipe(
            tap((deckId) =>
               this.store.dispatch(loadCards({userId: this.userId, deckId: deckId}))
            )
         )
      )
   }
   addCard () {
      const dialogRef = this.dialog.open(DialogComponent, {
         width: '250px',
         data: {title: "New Card", fields: [
            {
               label: "Front",
               multiline: true
            },
            {
               label: "Back",
               multiline: true
            }
         ]}
      });
      let newCard = dialogRef.afterClosed()
         .pipe(
            filter(([front, back]) => front != "" && back != ""),
         )
      zip(
         of(this.userId),
         this.deckId$,
         newCard
      ).pipe(
         mergeMap(([userId, deckId, [front, back]]) =>
            this.cardService.createCard(this.userId, deckId, {front, back, userId})
         ),
         mergeMap(() => this.loadCardList())
      ).subscribe()
   }
}
