import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>{{product?.name}}</h2>

    <p>Stock: {{product?.stock}}</p>

    <label>Quantity:</label>
    <input type="number" [(ngModel)]="quantity" min="1" />

    <button (click)="addToCart()">Add to Cart</button>
  `
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  quantity = 1;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private cart: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.api.getProduct(id).subscribe((res: any) => {
      this.product = res;
    });
  }

  addToCart() {
    this.cart.add({ ...this.product, quantity: this.quantity });
    alert('Added to cart ✅');
  }
}