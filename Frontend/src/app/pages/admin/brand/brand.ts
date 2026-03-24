import { Component } from '@angular/core';
import { ApiService } from '../../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Add Brand</h2>

    <input [(ngModel)]="name" placeholder="Brand Name" />
    <input [(ngModel)]="categoryId" placeholder="Category Id" type="number"/>

    <button (click)="add()">Add</button>
  `
})
export class BrandComponent {

  name = '';
  categoryId!: number;

  constructor(private api: ApiService) {}

  add() {
    this.api.addBrand({
      name: this.name,
      categoryId: this.categoryId
    }).subscribe(() => alert('Brand added ✅'));
  }
}