import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operator-product-display',
  templateUrl: './operator-product-display.component.html',
  styleUrls: ['./operator-product-display.component.css']
})
export class OperatorProductDisplayComponent implements OnInit {
  @Input () productList;

  constructor() { }

  ngOnInit() {
  }

}
