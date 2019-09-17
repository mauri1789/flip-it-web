import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Deck, UserInfo } from '../../store.models';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
   userData: UserInfo;
   decks: Deck[];
   constructor(
      private userService:UserService
   ) { }

   ngOnInit() {
      this.userService.getUser('global')
      .subscribe(({decks, ...userInfo}) => {
         this.userData = userInfo
         this.decks = decks
      })
   }

}
