import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gyg-search',
  templateUrl: './gyg-search.component.html',
  styleUrls: ['./gyg-search.component.css']
})
export class GygSearchComponent implements OnInit {
  gygResults = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  handleGYGResultsSearch() {
    this.dataService.getGYGtopMain('barcelona').subscribe(res => this.gygResults = res);
  }

}
