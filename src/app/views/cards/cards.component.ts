import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  deckCards$;
  constructor(
    private route: ActivatedRoute
  ) {
    this.deckCards$ = this.route.paramMap.pipe(
      // switchMap((params: ParamMap) =>
      //   httpcall
    )
  }

  ngOnInit() {
    this.deckCards$.subscribe(param => console.log(param.get('deckId')))
  }

}
