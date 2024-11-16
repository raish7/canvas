import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-choose-us',
  standalone: true,
  imports: [NgFor],
  templateUrl: './choose-us.component.html',
  styleUrl: './choose-us.component.scss'
})
export class ChooseUsComponent {
  data = [
    { icon: 'Palette', text: "Curated collection of unique artworks" },
    { icon: 'Paintbrush', text: "Direct connection with talented artists" },
    { icon: 'ShoppingBag', text: "Secure transactions and worldwide shipping" },
  ]
}
