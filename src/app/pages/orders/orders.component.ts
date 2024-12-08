import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment/payment.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { switchMap, catchError, of } from 'rxjs';
import { toastMixin } from '../../utils/toastMixin';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, NgClass, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  purchases: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (Object.keys(params).length === 0) {
        this.getPurchases();
      } else if (params.pidx) {
        // this.paymentService.lookupTransaction({pidx: params.pidx}).subscribe({
        //   next: (response: any) => {
        //     const { total_amount, status, pidx } = response.data;
        //     const payload = {
        //       amount: total_amount / 100,
        //       paymentStatus: status.toUpperCase()
        //     };
        //     this.paymentService.updateStatus(pidx, payload).subscribe({
        //       next: (response: any) => {
        //         console.log('update success', response)
        //         this.getPurhases();
        //       },
        //       error: (err: any) => {
        //         console.log('Failed to update status', err);
        //       }
        //     })
        //   },
        //   error: (err: any) => {
        //     console.log('error', err);
        //   }
        // })
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
                toastMixin("success", "Purchase placed successfully");
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
    this.paymentService.getPurchase(2).subscribe({
      next: (response: any) => {
        this.purchases = response.data.filter((purchase: any) => purchase.artworks.length > 0);
      },
      error: (err: any) => {
        console.log('err', err);
        toastMixin("error", "Failed to get purchases")
      },
    });
  }
}
