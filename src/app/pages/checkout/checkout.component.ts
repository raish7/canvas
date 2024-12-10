import { Component, computed, signal, WritableSignal } from '@angular/core';
import { ArtworksService } from '../../services/artworks/artworks.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment/payment.service';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { toastMixin } from '../../utils/toastMixin';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  checkoutItems: WritableSignal<any> = signal([]);
  selectedPaymentMethod: any = null;
  submitting = false;
  subscriptions: Subscription[] = [];
  purchasePayload = {
    buyer: null,
    artworks: [],
    amount: 0,
    status: 'PENDING',
  };
  paymentPayload = {
    return_url: `https://canvas-wine.vercel.app/orders`,
    website_url: `https://canvas-wine.vercel.app/home`,
    amount: 0,
    purchase_order_id: 'Canvas_001',
    purchase_order_name: 'Painting',
  };

  grandTotal = computed(() => {
    return this.checkoutItems().reduce(
      (acc: any, item: { price: number; quantity: number }) =>
        acc + item.price * (item.quantity ?? 1),
      0
    );
  });

  constructor(
    private artworkService: ArtworksService,
    private paymentService: PaymentService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.artworkService.checkoutItems.subscribe((res: any) => {
        this.checkoutItems.set([...res]);
      })
    );
  }

  purchase() {
    this.submitting = true;
    switch (this.selectedPaymentMethod) {
      case 'cashOnDelivery':
        this.paymentService
          .createPurchase({
            ...this.purchasePayload,
            buyer: this.authService.getCurrentUser().id,
            pidx: `cod_${uuidv4()}`,
            amount: this.grandTotal(),
            artworks: this.checkoutItems().map((artwork: any) => artwork.id),
          })
          .subscribe({
            next: () => {
              this.router.navigate(['/orders']);
              toastMixin('success', 'Purchase placed successfully.');
            },
            error: (err: any) => {
              console.log('err on purchase', err);
              this.submitting = false;
              toastMixin('error', 'Failed to create purchase');
            },
          });
        break;
      case 'khalti':
        this.paymentService
          .initiatePayment({
            ...this.paymentPayload,
            amount: this.grandTotal() * 100,
          })
          .subscribe({
            next: (response: any) => {
              const { pidx, payment_url } = response.data;
              this.paymentService
                .createPurchase({
                  ...this.purchasePayload,
                  buyer: this.authService.getCurrentUser().id,
                  pidx: pidx,
                  amount: this.grandTotal(),
                  artworks: this.checkoutItems().map(
                    (artwork: any) => artwork.id
                  ),
                })
                .subscribe({
                  next: () => {
                    window.location.href = payment_url;
                  },
                  error: (err: any) => {
                    console.log('err on purchase', err);
                    toastMixin('error', 'Failed to create purchase');
                    this.submitting = false;
                  },
                });
            },
            error: (err: any) => {
              console.log('err on payment', err);
              toastMixin('error', 'Failed to initiate payment');
              this.submitting = false;
            },
          });
        break;
      case 'esewa':
        toastMixin('warning', 'Esewa payment coming soon');
        this.submitting = false;
        break;
    }
  }

  removeFromCart(item: any) {
    const index = this.checkoutItems().findIndex(
      (x: { id: any }) => x.id === item.id
    );
    if (item.quantity === 1) {
      this.checkoutItems().splice(index, 1);
    }
    this.artworkService.removeCheckOutItems(item);
  }

  goBack() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
