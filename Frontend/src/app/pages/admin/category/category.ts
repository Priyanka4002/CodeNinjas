import { Component } from '@angular/core';
import { ApiService } from '../../../services/api';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Add Category</h2>

    <input [(ngModel)]="name" placeholder="Category Name" />
    <button (click)="add()">Add</button>
  `
})
export class CategoryComponent {

  name = '';

  constructor(private api: ApiService) {}

  add() {
    this.api.addCategory({ name: this.name })
      .subscribe(() => alert('Category added ✅'));
  }
}