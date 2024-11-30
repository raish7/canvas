import { Component } from '@angular/core';
import { ArtworksService } from '../../services/artworks/artworks.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  subTotal = 0;
  vatAmt = 0;
  grandTotal = 0;
  checkoutItems: any[] = [];
  paymentOption = null;
  selectedPaymentMethod = null;
  constructor(private artworkService: ArtworksService) {}

  ngOnInit() {
    
    this.artworkService.checkoutItems.subscribe((res: any) => {
      console.log('data received', res)
      this.checkoutItems = res;
      this.grandTotal = this.checkoutItems.reduce((acc, val) => acc + val.price, 0);
    })
  }
}
