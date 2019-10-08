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
      let url = ['deck', `${userId}-${deckId}`]
      return this.requestService.get<CardsSummary>(url)
   }
   deleteCard (cardId:string, deckId:string) {
      deckId = deckId.split("#").join("-")
      let url = ['deck', deckId, 'card', cardId]
      return this.requestService.delete(url)
   }
}
