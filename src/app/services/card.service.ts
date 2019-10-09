import { Injectable } from '@angular/core';
import { RequestService } from "./request.service";
import { Observable } from 'rxjs';
import { CardsSummary } from '../store.models';

@Injectable({
   providedIn: 'root'
})
export class CardService {
   
   constructor(
      private requestService: RequestService
   ) { }
   getDeckCards(userId:string, deckId:string): Observable<CardsSummary> {
      let deckKey = `${userId}-${deckId}`
      let url = ['deck', deckKey]
      return this.requestService.get<CardsSummary>(url)
   }
   deleteCard (cardId:string, deckKey:string) {
      deckKey = deckKey.split("#").join("-")
      let url = ['deck', deckKey, 'card', cardId]
      return this.requestService.delete(url)
   }
   createCard(userId, deckId, data) {
      let url = ['deck', `${userId}-${deckId}`, 'card']
      return this.requestService.put(url, data)
   }
}
