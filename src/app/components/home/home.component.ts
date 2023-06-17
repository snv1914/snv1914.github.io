import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.getWeatherConditions();
  }

  getWeatherConditions() {
      this.homeService.getWeatherConditions().subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (errorObj: any) => {
          console.log(errorObj)
        },
        complete: () => {
          console.info('complete');
        }
      });
  }
}
