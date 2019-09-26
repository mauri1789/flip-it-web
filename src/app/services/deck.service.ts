import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fpDomain } from '../../environments/environment.dev';
import { DecksSummary, Card } from '../store.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DeckService {
   constructor(
      private http: HttpClient 
   ) {
      // this.deckEffects.loadDecksSummary$.subscribe(x => console.log(x))
   }
   getDeckCards (deckId): Observable<Card> {
      let url = `${fpDomain}/deck/${deckId}`
      return this.http.get(url).pipe(map(response => response as Card))
   }
   getUserDecks (userId): Observable<DecksSummary> {
      let url = `${fpDomain}/user/${userId}`
      return this.http.get(url).pipe(map(response => response as DecksSummary))
   }
}
