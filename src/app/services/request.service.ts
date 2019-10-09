import { Injectable } from '@angular/core';
import { fpDomain } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
   providedIn: 'root'
})
export class RequestService {

   constructor(
      private http: HttpClient
   ) { }
   get<DataType>(url: Array<string>) {
      let fullUrl = this.getFullUrl(url)
      return this.http
         .get(fullUrl)
         .pipe(map(response => response as DataType))
   }
   put(url: Array<string>, body) {
      let fullUrl = this.getFullUrl(url)
      return this.http.put(fullUrl, body)
   }
   delete(url: Array<string>) {
      let fullUrl = this.getFullUrl(url);
      return this.http.delete(fullUrl)
   }
   getFullUrl (url) {
      url.unshift(fpDomain)
      return url.join('/')
   }
}
