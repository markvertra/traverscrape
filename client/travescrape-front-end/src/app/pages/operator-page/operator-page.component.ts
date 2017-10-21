import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-operator-page',
  templateUrl: './operator-page.component.html',
  styleUrls: ['./operator-page.component.css']
})
export class OperatorPageComponent implements OnInit {
  productList: Array<object>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getProducts(params['name']);
      });
  }

  getProducts(name) {
    this.dataService.getProductsByOperator(name).subscribe(res => this.productList = res);
  }
}
