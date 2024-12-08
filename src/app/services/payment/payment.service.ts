import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  initiatePayment(data: any) {
    return this.http.post(`${environment.apiUrl}/payment`, data);
  }
  lookupTransaction(data: any) {
    return this.http.post(`${environment.apiUrl}/payment/lookup`, data);
  }
  createPurchase(data: any) {
    return this.http.post(`${environment.apiUrl}/purchase`, data);
  }
  updateStatus(pidx: any, data: any) {
    return this.http.patch(
      `${environment.apiUrl}/purchase/update-status/${pidx}`,
      data
    );
  }
  getPurchase(id: any) {
    return this.http.get(`${environment.apiUrl}/purchase/customer/${id}`);
  }
}