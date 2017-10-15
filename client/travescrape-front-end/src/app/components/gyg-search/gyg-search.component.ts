import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gyg-search',
  templateUrl: './gyg-search.component.html',
  styleUrls: ['./gyg-search.component.css']
})
export class GygSearchComponent implements OnInit {
  gygResults = [];
  filteredResults = [];
  titleFilter: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getGYGtopMain('barcelona').subscribe(res => { this.gygResults = res,
                                                                   this.filteredResults = res; });
  }


  handleSortChange(value) {
    switch (value) {
      case 'review':
        this.handleGYGReviewSort();
        break;
      case 'highPrice':
        this.handleGYGHighPriceSort();
        break;
      case 'lowPrice':
        this.handleGYGLowPriceSort();
        break;
    }
  }

  handleGYGReviewSort() {
    this.gygResults.sort((a, b) => {
      return b.reviews - a.reviews;
    });
    this.filteredResults.sort((a, b) => {
      return b.reviews - a.reviews;
    });
  }

  handleGYGHighPriceSort() {
    this.gygResults.sort((a, b) => {
      return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    });
    this.filteredResults.sort((a, b) => {
      return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    });
  }

  handleGYGLowPriceSort() {
    this.gygResults.sort((a, b) => {
      return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    });
    this.filteredResults.sort((a, b) => {
      return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    });
  }

  handleTitleFilter(value) {
    this.filteredResults = this.gygResults.filter((item) => {
      return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
             item.shortDescription.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  handleOperatorFilter(value) {
    this.filteredResults = this.gygResults.filter((item) => {
        return item.operator.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

  handleOperatorQuery(product) {
    this.dataService.getOperator(product).subscribe(res => res);
  }
}
