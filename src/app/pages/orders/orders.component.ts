import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment/payment.service';
import { CommonModule, NgClass } from '@angular/common';
import { switchMap, catchError, of } from 'rxjs';
import { toastMixin } from '../../utils/toastMixin';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  purchases: any[] = [];
  isUserArtist = false;
  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private authService: AuthService
  ) {
    this.isUserArtist = JSON.parse(
      localStorage.getItem('user') as any
    )?.roles.includes('ARTIST');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length === 0) {
        this.getPurchases();
      } else if (params.pidx) {
        this.paymentService
          .lookupTransaction({ pidx: params.pidx })
          .pipe(
            switchMap((response: any) => {
              const { total_amount, status, pidx } = response.data;
              const payload = {
                amount: total_amount / 100,
                paymentStatus: status.toUpperCase(),
              };

              // Use switchMap to perform the second API call
              return this.paymentService.updateStatus(pidx, payload);
            }),
            catchError((err) => {
              console.error('Error in lookup or updateStatus', err);
              return of(null); // Return an empty observable to handle gracefully
            })
          )
          .subscribe({
            next: (response: any) => {
              if (response) {
                this.getPurchases();
                toastMixin('success', 'Purchase placed successfully');
              }
            },
            error: (err: any) => {
              console.error('Unexpected error in subscription', err);
            },
          });
      }
    });
  }

  getPurchases() {
    const user = this.authService.getCurrentUser();
    this.paymentService.getPurchase(user.id).subscribe({
      next: (response: any) => {
        this.purchases = response.data.filter(
          (purchase: any) => purchase.artworks.length > 0
        );
      },
      error: (err: any) => {
        console.log('err', err);
        toastMixin('error', 'Failed to get purchases');
      },
    });
  }
}
