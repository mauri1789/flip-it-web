import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fpDomain } from '../../environments/environment.dev';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
   providedIn: 'root'
})
export class UserService {
   constructor(private http: HttpClient) { }
   
}
