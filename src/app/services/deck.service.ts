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
   getDeckCards (deckId:string): Observable<Card> {
      let url = `${fpDomain}/deck/${deckId}`
      return this.http.get(url).pipe(map(response => response as Card))
   }
   getUserDecks (userId:string): Observable<Deck[]> {
      let url = `${fpDomain}/user/${userId}`
      return this.http.get(url).pipe(map(response => response as Deck[]))
   }
   createDeck (deckName:string, userId:string) {
      let deckKey = deckName.toLowerCase().split(' ').join('_')
      let url = `${fpDomain}/deck/`
      return this.http.put(url,{userId: userId, deckId: `${userId}#${deckKey}`, deckName: deckName})
   }
}
