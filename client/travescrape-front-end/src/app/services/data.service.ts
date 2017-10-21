import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  BASE_URL = 'http://localhost:3000';
  constructor(private http: Http) {}

  getGYGtopMain(city: string) {
    return this.http.get(`${this.BASE_URL}/gyg/${city}`)
    .map((res) => res.json());
  }

  getProductById(id: string) {
    return this.http.get(`${this.BASE_URL}/api/product/${id}`)
    .map((res) => res.json());
  }

  getOperator(product: object) {
    return this.http.post(`${this.BASE_URL}/gyg/operator`, product)
    .map((res) => res.json());
  }

  getProductsByOperator(name: string) {
    return this.http.get(`${this.BASE_URL}/gyg/operator/${name}`)
    .map((res) => res.json());
  }

  getUpdatedCards(city: string) {
    return this.http.get(`${this.BASE_URL}/gyg/update/${city}`)
    .map((res) => res.json());
  }

}
