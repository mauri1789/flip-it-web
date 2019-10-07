import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { switchMap, map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { CardService } from "../../services/card.service";
import { CardsSummary } from '../../store.models';
import { loadCards } from '../../actions/card.actions';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards$: Observable<CardsSummary>
  deckId$: Observable<string>;
  userId:string;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private store: Store<{cardsSummary: CardsSummary}>
  ) {
    this.userId = 'mau'
    this.deckId$ = this.route.paramMap.pipe(
      map((params:ParamMap) => params.get('deckId'))
    )
    this.cards$ = store.pipe(select('cardsSummary'))
  }

  ngOnInit() {
    this.deckId$.subscribe(deckId => 
      this.store.dispatch(loadCards({userId: this.userId, deckId: deckId}))
    )
    this.cards$.subscribe(x => console.log(x))
  }

}
