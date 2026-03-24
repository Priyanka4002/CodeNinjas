import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>🛒 Cart</h2>

    <div style="display:flex; flex-wrap:wrap; gap:15px;">
  <div *ngFor="let item of items" 
       style="border:1px solid #ddd; padding:15px; width:220px; border-radius:10px;">

    <h3>Product: {{item.productId}}</h3>
    <p>Qty: {{item.quantity}}</p>

    <button (click)="increase(item)">➕</button>
    <button (click)="decrease(item)">➖</button>
    <button (click)="remove(item.productId)">❌</button>
  </div>
</div>

<button *ngIf="items.length > 0" (click)="placeOrder()">
  ✅ Place Order
</button>
  `
})
export class CartComponent implements OnInit {

  items: any[] = [];

  constructor(private cart: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  // ✅ Load cart from backend
  loadCart() {
    this.cart.getCart().subscribe({
      next: (res: any) => {
        this.items = res;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load cart ❌');
      }
    });
  }

  // ➕ Increase quantity
  increase(item: any) {
    this.cart.update(item.productId, item.quantity + 1)
      .subscribe({
        next: () => this.loadCart(),
        error: () => alert('Error updating quantity ❌')
      });
  }

  // ➖ Decrease quantity
  decrease(item: any) {
    if (item.quantity > 1) {
      this.cart.update(item.productId, item.quantity - 1)
        .subscribe({
          next: () => this.loadCart(),
          error: () => alert('Error updating quantity ❌')
        });
    }
  }

  // ❌ Remove item
  remove(productId: number) {
    this.cart.remove(productId)
      .subscribe({
        next: () => this.loadCart(),
        error: () => alert('Error removing item ❌')
      });
  }

  // ✅ Place order
  placeOrder() {
    this.cart.placeOrder().subscribe({
      next: () => {
        alert('Order placed successfully 🎉');
        this.loadCart(); // refresh cart (should be empty)
      },
      error: (err) => {
        console.error(err);
        alert('Order failed ❌');
      }
    });
  }
}