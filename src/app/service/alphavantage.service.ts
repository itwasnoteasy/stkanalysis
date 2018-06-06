import { AV_BASE_URL, CCI_FUNCTION,
  PARAM_SYMBOL,
  PARAM_INTERVAL, DAILY_INTERVAL, PARAM_TIME_PERIOD,
  PARAM_API_KEY, TEN_TP, FIVE_MIN_INTERVAL, WEEKLY_INTERVAL, 
  HOURLY_INTERVAL, MONTHLY_INTERVAL, CCI_DATA_KEY, TWENTY_TP, 
  TOP_UP, MID_UP, BTM_UP, TOP_DN, MID_DN, BTM_DN, NO_CRS_OVER } 
  from './../constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AlphavantageService {

  private apiKey: string = atob(environment.apiKey);
  constructor(private http: HttpClient) { }

   getCCIForInterval(_ticker: string, _interval: string) {
    let promise = new Promise((resolve, reject) => {
       this.http.get(AV_BASE_URL +
        CCI_FUNCTION +
        PARAM_SYMBOL +
        _ticker +
        PARAM_INTERVAL +
        _interval +
        PARAM_TIME_PERIOD +
        TWENTY_TP +
        PARAM_API_KEY + this.apiKey
      ).subscribe((data: any) => {
        resolve(data[CCI_DATA_KEY]);
      }, error => {
        reject(error);
      })
    });
    return promise;
  }

  async getFiveMinuteCCI(ticker: string) {
    await this.getCCIForInterval(ticker, FIVE_MIN_INTERVAL).then((cciData: any) => {
      return this.crossOverLine(cciData);
    });
  }

   async getHourlyCCI(ticker: string) {
     await this.getCCIForInterval(ticker, HOURLY_INTERVAL).then((cciData: any) => {
      return this.crossOverLine(cciData);
    });
  }

  getDailyCCI(ticker: string) {
    this.getCCIForInterval(ticker, DAILY_INTERVAL).then((cciData: any) => {
      return this.crossOverLine(cciData);
    });
  }

  getWeeklyCCI(ticker: string) {
    this.getCCIForInterval(ticker, WEEKLY_INTERVAL).then((cciData: any) => {
      return this.crossOverLine(cciData);
    });
  }

  getMonthlyCCI(ticker: string) {
    this.getCCIForInterval(ticker, MONTHLY_INTERVAL).then((cciData: any) => {
      return this.crossOverLine(cciData);
    });
  }

   async getCrossOversForTicker(ticker: string) {
     let fiveMData; 
     await this.getFiveMinuteCCI(ticker).then(_data=> fiveMData = _data);
     let hourlyData;
     await this.getHourlyCCI(ticker).then(_data => {
       hourlyData = _data;
       console.log( {5: fiveMData, 60: hourlyData});
      });

  }

  crossOverLine(cciData: any) {
    let line;
    let cciOne = cciData[Object.keys(cciData)[0]].CCI;
    let cciTwo = cciData[Object.keys(cciData)[1]].CCI;
    if(cciOne > 100 && cciTwo < 100) {
      line = TOP_UP;
    } else if(cciOne > 0 && cciTwo < 0 ) {
      line = MID_UP;
    } else if (cciOne > -100 && cciTwo < -100) {
      line = BTM_UP;
    } else if(cciTwo > 100 && cciOne < 100) {
      line = TOP_DN;
    } else if(cciTwo > 0 && cciOne < 0 ) {
      line = MID_DN;
    } else if (cciTwo > -100 && cciOne < -100) {
      line = BTM_DN;
    } else {
      line = NO_CRS_OVER
    }
    console.log(line);
    return line;
  }
}

