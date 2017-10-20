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
    this.dataService.getGYGtopMain('barcelona').subscribe(res => { this.gygResults = this.handleGYGRankSort(res),
                                                                   this.filteredResults = this.handleGYGRankSort(res); });
  }


  handleSortChange(value) {
    switch (value) {
      case 'review':
        this.handleGYGReviewSort(this.gygResults);
        this.handleGYGReviewSort(this.filteredResults);
        break;
      case 'highPrice':
        this.handleGYGHighPriceSort(this.gygResults);
        this.handleGYGHighPriceSort(this.filteredResults);
        break;
      case 'lowPrice':
        this.handleGYGLowPriceSort(this.gygResults);
        this.handleGYGLowPriceSort(this.filteredResults);
        break;
      case 'ranking':
        this.handleGYGRankSort(this.gygResults);
        this.handleGYGRankSort(this.filteredResults);
        break;
    }
  }

  handleGYGReviewSort(array) {
    array.sort((a, b) => {
      return b.reviews - a.reviews;
    });
  }

  handleGYGRankSort(array): Array<object> {
    array.sort((a, b) => {
      return a.mainPageRank - b.mainPageRank;
    });
    return array;
  }

  handleGYGHighPriceSort(array) {
    array.sort((a, b) => {
      return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    });
  }

  handleGYGLowPriceSort(array) {
    array.sort((a, b) => {
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
