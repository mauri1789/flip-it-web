import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { CardService } from "../services/card.service";
import { setCards, loadCards } from "../actions/card.actions";

@Injectable()
export class CardEffects {
   loadCardsSummary$;
   constructor(
      private actions$: Actions,
      private cardService: CardService,
      private store: Store<{}>
   ) {
      this.loadCardsSummary$ = createEffect(() =>
         this.actions$.pipe(
            ofType(loadCards),
            exhaustMap(action =>
                  this.cardService.getDeckCards(action.userId, action.deckId).pipe(
                     map(cardsData => setCards(cardsData)),
                     tap((action) => store.dispatch(action))
                  )
            )
         )
      )
   }
}
