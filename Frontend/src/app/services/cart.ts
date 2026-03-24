import { Injectable } from '@angular/core';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private api: ApiService) {}

  add(productId: number, quantity: number = 1) {
    return this.api.addToCart({
      productId,
      quantity
    });
  }

  getCart() {
    return this.api.getCart();
  }

  update(productId: number, quantity: number) {
    return this.api.updateCart(productId, quantity);
  }

  remove(productId: number) {
    return this.api.removeCartItem(productId);
  }

  placeOrder() {
    return this.api.placeOrder1(); // no body now
  }

  

}