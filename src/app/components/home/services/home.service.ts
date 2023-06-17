import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

export const httpHeader = {
  'Content-Type': 'application/json; charset=utf-8', //'application/json'
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  // Define API
  apiURL = "https://api.tomorrow.io/v4/";
  weatherUrl = "";
  params = "";

  constructor(private http: HttpClient) {
    // this.weatherUrl = this.apiURL
  }

  /*========================================
     Methods
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders(httpHeader)
  }

  private httpOptionsAuth = {
    //  headers: new HttpHeaders(this.utilsApi.constants.httpHeader),
    observe: 'response' as 'body'
    // observe: 'response'
  }


  // list the fields
/* const fields = [
  "precipitationIntensity",
  "precipitationType",
  "windSpeed",
  "windGust",
  "windDirection",
  "temperature",
  "temperatureApparent",
  "cloudCover",
  "cloudBase",
  "cloudCeiling",
  "weatherCode",
];
 */

  getWeatherConditions(): Observable<any> {
    this.params = `location=16.405861, 80.827473`;
    this.params += `&timesteps=current`;
    this.params += `&units=metric`;
    this.params += `&apikey=wDLWhazofwP83IoK7rHeyZxDTC4hpTO2`;
    this.params += `&fields=windSpeed&fields=windDirection&fields=humidity&fields=temperature&fields=cloudCover&fields=cloudBase&fields=cloudCeiling`;
    this.weatherUrl = this.apiURL + "timelines?" + this.params;
    return this.http.get<any>(this.weatherUrl, this.httpOptions)
      .pipe(
        retry(1), 
        catchError(this.handleError)
      )
  }


  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(error);
  }
}
