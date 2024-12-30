import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtworksService {
  checkoutItems = new BehaviorSubject(<any>[]);
  constructor(private http: HttpClient) {}

  getArtWorks(query: any) {
    if (query) {
      return this.http.get(`${environment.apiUrl}/artwork?${query}`);
    } else {
      return this.http.get(`${environment.apiUrl}/artwork`);
    }
  }

  createArtwork(data: any) {
    return this.http.post(`${environment.apiUrl}/artwork`, data);
  }

  uploadImages(data: any) {
    return this.http.post(`${environment.apiUrl}/images/upload`, data)
  }

  getArtWorkById(id: number) {
    return this.http.get(`${environment.apiUrl}/artwork/${id}`);
  }

  getArtWorkByArtistId(id: number) {
    return this.http.get(`${environment.apiUrl}/artwork?artistId=${id}`);
  }

  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`);
  }

  getProfile(id: number) {
    return this.http.get(`${environment.apiUrl}/profile/user/${id}`);
  }

  addCheckOutItems(item: any) {
    const currentValue = this.checkoutItems.getValue();
    const index = currentValue.findIndex((val: any) => val.id === item.id);
    if (index > -1) {
      currentValue[index].quantity++;
    } else {
      const updateValue = [...currentValue, item];
      this.checkoutItems.next(updateValue);
    }
  }

  removeCheckOutItems(item: any) {
    const currentValue = this.checkoutItems.getValue();
    const index = currentValue.findIndex((val: any) => val.id === item.id);
    if (index > -1 && item.quantity > 1) {
      currentValue[index].quantity--;
      this.checkoutItems.next(currentValue);
    } else {
      const updateValue = currentValue.filter((x: any) => x.id !== item.id);
      this.checkoutItems.next(updateValue);
    }
  }

  addComment(data: any) {
    return this.http.post(`${environment.apiUrl}/comments`, data);
  }
}
