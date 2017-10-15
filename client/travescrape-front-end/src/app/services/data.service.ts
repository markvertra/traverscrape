import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  BASE_URL = 'http://localhost:3000';
  constructor(private http: Http) {}

  getGYGtopMain(city: String) {
    return this.http.get(`${this.BASE_URL}/gyg/${city}`)
    .map((res) => res.json());
  }
}
