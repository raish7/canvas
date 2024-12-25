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
import CryptoJS from 'crypto-js';

// import SHA256 from "crypto-js/sha256";
// import HmacMD5 from "crypto-js/hmac-md5";
// // import CryptoJS from "crypto-js/core";
// import Base64 from "crypto-js/enc-base64";
// import Utf8 from "crypto-js/enc-utf8";
// import AES from "crypto-js/aes";
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

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
  esewaKey = '8gBm/:&EnhH.1/q';

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
    const signedData = `total_amount=100,transaction_uuid=2081-82X2,product_code=EPAYTEST`;
    // Generate the HMAC-SHA256 hash
    const hash = CryptoJS.HmacSHA256(signedData, this.esewaKey);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    console.log('hash', hashInBase64);
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
        // Concatenate the fields in the order specified
        const signedData = `total_amount=100,transaction_uuid=2081-82X2,product_code=EPAYTEST`;
        // Generate the HMAC-SHA256 hash
        const hash = CryptoJS.HmacSHA256(signedData, this.esewaKey);
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        console.log('hash', hashInBase64);

        const payload = {
          amount: 100,
          tax_amount: 0,
          product_service_charge: 0,
          product_delivery_charge: 0,
          product_code: 'EPAYTEST',
          total_amount: 100,
          transaction_uuid: '2081-82X2',
          success_url: 'http://localhost:4200/orders',
          failure_url: 'http://localhost:4200',
          signed_field_names: 'total_amount,transaction_uuid,product_code',
          signature: hashInBase64,
        };
        const formData = new FormData();
        formData.append('amount', payload.amount.toString());
        formData.append('tax_amount', payload.tax_amount.toString());
        formData.append(
          'product_service_charge',
          payload.product_service_charge.toString()
        );
        formData.append(
          'product_delivery_charge',
          payload.product_delivery_charge.toString()
        );
        formData.append('product_code', payload.product_code);
        formData.append('total_amount', payload.total_amount.toString());
        formData.append('transaction_uuid', payload.transaction_uuid);
        formData.append('success_url', payload.success_url);
        formData.append('failure_url', payload.failure_url);
        formData.append('signed_field_names', payload.signed_field_names);
        formData.append('signature', payload.signature);
        this.paymentService.esewaPayment(formData).subscribe({
          next: (res: any) => {
            console.log('ressss', res);
          },
          error: (err: any) => {
            console.log('err', err);
            
          },
        });
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
