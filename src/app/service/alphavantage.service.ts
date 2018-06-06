import { AV_BASE_URL, CCI_FUNCTION,
  PARAM_SYMBOL,
  PARAM_INTERVAL, DAILY_INTERVAL, PARAM_TIME_PERIOD,
  PARAM_API_KEY, TEN_TP } from './../constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AlphavantageService {

  constructor(private http: HttpClient) { }

  getDailyCCI(ticker: string) {
    return this.http.get(AV_BASE_URL +
      CCI_FUNCTION +
      PARAM_SYMBOL +
      ticker +
      PARAM_INTERVAL +
      DAILY_INTERVAL +
      PARAM_TIME_PERIOD +
      TEN_TP +
      PARAM_API_KEY + 'demo'
    ).subscribe((data: any) => {
      console.log(data);
    });
  }
}
