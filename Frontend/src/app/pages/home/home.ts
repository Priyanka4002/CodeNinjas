import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Categories</h2>

    <!-- Categories -->
    <div style="display:flex; gap:10px; ">
      <div *ngFor="let c of categories"
           (click)="selectCategory(c.id)"
           style="padding:10px; border:1px solid #ccc; cursor:pointer;">
        {{c.name}}
      </div>
    </div>

    <hr>

    <!-- Brands -->
    <div *ngIf="brands.length > 0">
      <h2>Brands</h2>

      <div style="display:flex; gap:10px; ">
        <div *ngFor="let b of brands"
             (click)="goToProducts(b.id)"
             style="padding:10px; border:1px solid #aaa; cursor:pointer;">
          {{b.name}}
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {

  categories: any[] = [];
  brands: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
  this.api.getCategories().subscribe({
    next: (res: any) => {
      console.log('CATEGORIES:', res);
      this.categories = res;
    },
    error: (err) => {
      console.error('Error loading categories', err);
    }
  });
}

  selectCategory(categoryId: number) {
    this.api.getBrands(categoryId).subscribe((res: any) => {
      console.log('BRANDS:', res);
      this.brands = res;
    });
  }

  goToProducts(brandId: number) {
    this.router.navigate(['/products', brandId]);
  }
}