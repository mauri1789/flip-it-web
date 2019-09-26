import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { loadDecks } from "../actions/deck.actions";
import { DeckService } from "../services/deck.service";
import { setDecks } from "../actions/deck.actions";

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
                     map(deckData => setDecks(deckData)),
                     tap(() => console.log("it worked!!"))
                     // tap((action) => store.dispatch(action))
                  )
            )
         )
      )
   }
}
