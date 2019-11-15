import { Injectable } from '@angular/core';
import { fpDomain } from '../../environments/environment.dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { SessionService } from './session.service';

@Injectable({
   providedIn: 'root'
})
export class RequestService {
   httpOptions:any;
   constructor(
      private http: HttpClient,
      private sessionService:SessionService
   ) {
      this.sessionService.userSession$.subscribe(({token}) => {
         this.httpOptions = {
            headers: new HttpHeaders({'Authorization':  `Bearer ${token}`})
         };
      })
   }
   get<DataType>(url: Array<string>) {
      let fullUrl = this.getFullUrl(url)
      return this.http
         .get(fullUrl, this.httpOptions)
         .pipe(map(response => (response as any) as DataType))
   }
   put(url: Array<string>, body) {
      let fullUrl = this.getFullUrl(url)
      return this.http.put(fullUrl, body, this.httpOptions)
   }
   delete(url: Array<string>) {
      let fullUrl = this.getFullUrl(url);
      return this.http.delete(fullUrl, this.httpOptions)
   }
   getFullUrl (url) {
      url.unshift(fpDomain)
      return url.join('/')
   }
}
