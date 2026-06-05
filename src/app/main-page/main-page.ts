import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { finalize } from 'rxjs';
import { MainPageService } from '../main-page-service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-main-page',
  imports: [NgFor, NgIf],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private mainPageService: MainPageService) {}

  ngOnInit() {
    this.takeProduct();
  }

  takeProduct() {
    this.loading = true;
    this.error = '';

    this.mainPageService.getProduct().pipe(finalize(() => {
      this.loading = false;
    })).subscribe({
      next: (data: Product[]) => {
        console.log('Data received:', data);
        console.log('Data length:', data.length);
        this.products = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'პროდუქტების ჩატვირთვის შეცდომა: ' + (err.message || 'Unknown error');
      },
    });
  }
}
