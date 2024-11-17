import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtworksService {

  constructor(private http: HttpClient) { }

  getArtWorks() {
    return this.http.get(`${environment.apiUrl}/artwork`)
  }

  getArtWorkById(id: number) {
    return this.http.get(`${environment.apiUrl}/artwork/${id}`)
  }
}
