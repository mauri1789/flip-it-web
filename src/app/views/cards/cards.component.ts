import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap, map } from "rxjs/operators";
import { CardService } from "../../services/card.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  deckCards$;
  userId:string;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {
    this.userId = 'mau'
    this.deckCards$ = this.route.paramMap.pipe(
      map((params:ParamMap) => params.get('deckId')),
      switchMap((deckId: string) =>
        this.cardService.getDeckCards(this.userId, deckId)
      )
    )
  }

  ngOnInit() {
    this.deckCards$.subscribe(cardSummary => console.log(cardSummary))
  }

}
