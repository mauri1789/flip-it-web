import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { DeckService } from "../services/deck.service";
import { setDecks, loadDecks } from "../actions/deck.actions";

@Injectable()
export class DeckEffects {
   loadDecksSummary$;
   constructor(
      private actions$: Actions,
      private deckService: DeckService,
      private store: Store<{}>
   ) {
      this.loadDecksSummary$ = createEffect(() =>
         this.actions$.pipe(
            ofType(loadDecks),
            exhaustMap(action =>
                  this.deckService.getUserDecks(action.userId).pipe(
                     map(deckList => ({
                        decksSummary: {
                           userName: action.userId,
                           totalDecks: deckList.length,
                           cardCount: deckList.reduce((total, deck) => total + deck.cardCount, 0),
                           decks: deckList,
                           lastStudied: 'Feb the 3rd'
                        }
                     })),
                     map(deckData => setDecks(deckData)),
                     tap((action) => store.dispatch(action))
                  )
            )
         )
      )
   }
}
