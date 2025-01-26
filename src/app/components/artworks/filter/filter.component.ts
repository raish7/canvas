import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  selectedPrice = '';
  selectedCategory = '';

  setFilter = output<{ value: string, type: 'priceSortBy' | 'category' }>();
  clearFilter = output<any>();
  isUserArtist = input<boolean>();
  categories = input<any[]>();

  sortArtworks(value: any, type: any) {
    this.setFilter.emit({ value: value.value, type });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.selectedPrice = '';
    this.clearFilter.emit(null);
  }
}
