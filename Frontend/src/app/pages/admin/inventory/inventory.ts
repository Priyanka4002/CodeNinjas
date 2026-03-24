import { Component } from '@angular/core';
import { ApiService } from '../../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Update Inventory</h2>

    <input [(ngModel)]="productId" type="number" placeholder="Product Id" />
    <input [(ngModel)]="stock" type="number" placeholder="New Stock" />

    <button (click)="update()">Update</button>
  `
})
export class InventoryComponent {

  productId!: number;
  stock!: number;

  constructor(private api: ApiService) {}

  update() {
    this.api.updateStock({
      productId: this.productId,
      stock: this.stock
    }).subscribe(() => alert('Stock updated ✅'));
  }
}