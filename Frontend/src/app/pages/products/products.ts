import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Products</h2>
    <div style="display:flex; flex-wrap:wrap; gap:15px;">
  <div *ngFor="let p of products" 
       style="border:1px solid #ddd; padding:15px; width:200px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.1);">

    <h3>{{p.name}}</h3>
    <p>Stock: {{p.stock}}</p>

    <button (click)="viewDetails(p.id)">View</button>
    <button (click)="addToCart(p)">Add</button>
  </div>
</div>
  `
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit() {
  const brandId = this.route.snapshot.params['brandId'];

  this.api.getProducts(brandId).subscribe((res: any) => {
    console.log('PRODUCTS:', res);
    this.products = res;
  });
}

  addToCart(product: any) {
  this.cart.add(product.id, 1).subscribe(() => {
    alert('Added to cart ✅');
  });
  }

  viewDetails(id: number) {
  this.router.navigate(['/product', id]);
}

}