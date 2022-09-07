import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(product: any) {
    return this.http.post<any>('http://localhost:3000/productList', product);
  }

  getProduct() {
    return this.http.get<any>('http://localhost:3000/productList');
  }

  putProduct(product: any, id: number) {
    return this.http.put<any>('http://localhost:3000/productList/' + id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:3000/productList/' + id);
  }

}
