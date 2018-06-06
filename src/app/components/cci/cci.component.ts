import { AlphavantageService } from './../../service/alphavantage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cci',
  templateUrl: './cci.component.html',
  styleUrls: ['./cci.component.css']
})
export class CciComponent implements OnInit {

  crossOvers: any;
  constructor(private avService: AlphavantageService) { }

  ngOnInit() {
  }

   getDailyCCI() {
     this.avService.getCrossOversForTicker('MSFT').then((data: any) => {
      this.crossOvers =  data;
    });
  }



}
