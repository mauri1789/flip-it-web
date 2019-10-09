import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { mergeMap, map, tap, first, filter } from "rxjs/operators";
import { Observable, zip, of } from 'rxjs';
import { DialogComponent } from '../elements/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CardService } from "../../services/card.service";
import { DeckService } from "../../services/deck.service";
import { CardsSummary, Card } from '../../store.models';
import { loadCards } from '../../actions/card.actions';
import { Router } from "@angular/router";

@Component({
   selector: 'app-cards',
   templateUrl: './cards.component.html',
   styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
   cardsSummary$: Observable<CardsSummary>
   deckId$: Observable<string>;
   deckId: string;
   userId:string;
   constructor(
      private route: ActivatedRoute,
      private cardService: CardService,
      private deckService: DeckService,
      private router: Router,
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
            tap((deckId) => this.deckId = deckId),
            tap((deckId) =>
               this.store.dispatch(loadCards({userId: this.userId, deckId: deckId}))
            )
         )
      )
   }
   deleteDeck () {
      let deleteAction = this.openDeleteDeck()
      deleteAction.pipe(
         mergeMap(() => this.deckService.deleteDeck(this.deckId, this.userId))
      ).subscribe(() => this.router.navigate([`decks`]))
   }
   addCard () {
      let newCard = this.openNewCardDialog()
      newCard.pipe(
         mergeMap(([front, back]) =>
            this.cardService.createCard(
               this.userId,
               this.deckId,
               {
                  front,
                  back,
                  userId: this.userId
               })
         ),
         mergeMap(() => this.loadCardList())
      ).subscribe()
   }
   openDeleteDeck() {
      const dialogRef = this.dialog.open(DialogComponent, {
         width: '250px',
         data: {
            title: "Delete Card",
            text: `Are you sure you want to delete ${this.deckId}?`,
            action: "Delete",
            fields: []
         }
      });
      let deleteAction = dialogRef.afterClosed()
         .pipe(
            filter((data) => data != null)
         )
      return deleteAction
   }
   openNewCardDialog() {
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
      return newCard
   }
}
