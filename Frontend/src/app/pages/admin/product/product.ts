import { Component } from '@angular/core';
import { ApiService } from '../../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Add Product</h2>

    <input [(ngModel)]="name" placeholder="Product Name" />
    <input [(ngModel)]="stock" type="number" placeholder="Stock" />
    <input [(ngModel)]="brandId" type="number" placeholder="Brand Id" />

    <button (click)="add()">Add</button>
  `
})
export class ProductComponent {

  name = '';
  stock!: number;
  brandId!: number;

  constructor(private api: ApiService) {}

  add() {
    this.api.addProduct({
      name: this.name,
      stock: this.stock,
      brandId: this.brandId
    }).subscribe(() => alert('Product added ✅'));
  }
}