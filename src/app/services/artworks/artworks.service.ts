import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {

  checkoutItems = new BehaviorSubject(<any>[])
  constructor(private http: HttpClient) { }

  getArtWorks(query: any) {
    if (query) {
      return this.http.get(`${environment.apiUrl}/artwork?${query}`)
    } else {
      return this.http.get(`${environment.apiUrl}/artwork`)

    }
  }

  getArtWorkById(id: number) {
    return this.http.get(`${environment.apiUrl}/artwork/${id}`)
  }

  getArtWorkByArtistId(id: number) {
    return this.http.get(`${environment.apiUrl}/artwork?artistId=${id}`)
  }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`)
  }

  getProfile(id: number) {
    return this.http.get(`${environment.apiUrl}/profile/user/${id}`)
  }

  addCheckOutItems(item: any) {
    const currentValue = this.checkoutItems.getValue();
    const updateValue = [...currentValue, item];
    this.checkoutItems.next(updateValue);
  }

}
