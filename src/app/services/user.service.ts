import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { bluebirdDomain } from '../../environments/environment.dev';
import { UserInfo } from '../store.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class UserService {
   constructor(private http: HttpClient) { }
   getUser (userName): Observable<UserInfo> {
      let url = `${bluebirdDomain}/user/${userName}`
      return this.http.get(url).pipe(map(response => response as UserInfo))
   }
}
