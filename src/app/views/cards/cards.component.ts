import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { mergeMap, map, tap, first } from "rxjs/operators";
import { Observable, pipe } from 'rxjs';
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
      private store: Store<{cardsSummary: CardsSummary}>
   ) {
      this.userId = 'mau'
      this.deckId$ = this.route.paramMap.pipe(
         map((params:ParamMap) => params.get('deckId'))
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
            mergeMap(this.loadCardList)
         )
         .subscribe()
   }
   loadCardList() {
      return (
         this.deckId$
            .pipe(
               first(),
               tap((deckId) =>
                  this.store.dispatch(loadCards({userId: this.userId, deckId: deckId}))
               )
            )
      )
   }

}
