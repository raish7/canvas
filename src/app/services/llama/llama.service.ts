import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LlamaService {

  constructor(private http: HttpClient) { }

  generateAvatarImage(payload: any) {
    return this.http.post(`${environment.apiUrl}/llama/avatar`, payload);
  }

  generateDescription(payload: any) {
    return this.http.post(`${environment.apiUrl}/llama/description`, payload);
  }
}
