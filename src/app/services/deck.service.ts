import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fpDomain } from '../../environments/environment.dev';
import { Deck, Card, DecksSummary } from '../store.models';
import { Store, select } from "@ngrx/store";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DeckService {
   constructor(
      private http: HttpClient,
      private store: Store<{decksSummary: DecksSummary}>
   ) { }
   getDeckCards (deckId): Observable<Card> {
      let url = `${fpDomain}/deck/${deckId}`
      return this.http.get(url).pipe(map(response => response as Card))
   }
   getUserDecks (userId): Observable<Deck[]> {
      let url = `${fpDomain}/user/${userId}`
      return this.http.get(url).pipe(map(response => response as Deck[]))
   }
}
