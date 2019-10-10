import { Injectable } from '@angular/core';
import { Deck  } from '../store.models';
import { RequestService } from "./request.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DeckService {
   constructor(
      private requestService: RequestService
   ) { }
   getUserDecks (userId:string): Observable<Deck[]> {
      let url = ['user', userId]
      return this.requestService.get<Deck[]>(url)
   }
   createDeck (deckName:string, userId:string) {
      deckName = deckName.toLowerCase().split(' ').join('_')
      let deckKey = `${userId}#${deckName}`
      let url = ['deck']
      let body = {
         userId: userId,
         deckId: deckKey,
         deckName: deckName,
         cardCount: 0
      }
      return this.requestService.put(url, body)
   }
   deleteDeck (deckId: string, userId:string) {
      let deckKey = `${userId}-${deckId}`
      let url = ['deck', deckKey];
      return this.requestService.delete(url)
   }
}
