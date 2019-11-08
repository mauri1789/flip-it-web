import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class LocalStorageService {
   get(key) {
		return JSON.parse(localStorage.getItem(key))
	}
	set(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	}
}
