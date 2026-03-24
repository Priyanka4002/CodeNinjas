import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://localhost:7243/api'; // match backend

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  getBrands(categoryId: number) {
    return this.http.get(`${this.baseUrl}/categories/${categoryId}/brands`);
  }

  getProducts(brandId: number) {
    return this.http.get(`${this.baseUrl}/brands/${brandId}/products`);
  }

  getProduct(productId: number) {
    return this.http.get(`${this.baseUrl}/products/${productId}`);
  }

  placeOrder(data: any) {
    return this.http.post(`${this.baseUrl}/orders`, data);
  }

  addProduct(data: any) {
  return this.http.post(`${this.baseUrl}/admin/products`, data);
  }

  addCategory(data: any) {
  return this.http.post(`${this.baseUrl}/admin/categories`, data);
}

addBrand(data: any) {
  return this.http.post(`${this.baseUrl}/admin/brands`, data);
}

updateStock(data: any) {
  return this.http.put(`${this.baseUrl}/admin/inventory`, data);
}

addToCart(data: any) {
  return this.http.post(`${this.baseUrl}/cart`, data);
}

getCart() {
  return this.http.get(`${this.baseUrl}/cart`);
}

updateCart(productId: number, quantity: number) {
  return this.http.put(`${this.baseUrl}/cart?productId=${productId}&quantity=${quantity}`, {});
}

removeCartItem(productId: number) {
  return this.http.delete(`${this.baseUrl}/cart/${productId}`);
}

placeOrder1() {
  return this.http.post(`${this.baseUrl}/orders`, {});
}
}