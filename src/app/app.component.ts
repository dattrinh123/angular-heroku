import { Component } from '@angular/core';
import {covid} from './models/covid.model';
import {ApiService} from './service/api.service';
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  global: boolean;
  country: string;
  data: covid;
  dailyData: any[];
  countries: any[];
  
  lineChartData: any[] = [
    {
      data: [65, 64, 33], label: 'Temp label'
    }
  ];
  lineChartType='line';
  lineChartLabels: any[] = [
    'Label01', 'Label01', 'Label03'
  ];
   barChartType='bar';
   barChartLabels: any[] = [
    'Infected', 'Recovered', 'Deaths'
  ];
    barChartData: any[] = [
    { data: [65, 76, 33], label: 'Lable' }
  ];

  constructor(private api:ApiService){
    this.data = new covid();
  }

  

  ngOnInit ():void {
    this.global=true;
    this.fetchData();
    this.fetchCountries();
    this.fetchDailyData();
  }

  fetchData(){
    this.api.fetchData().subscribe((res:any[])=>{
      this.data.confirmed= res['confirmed']['value'];
      this.data.recovered= res['recovered']['value'];
      this.data.deaths= res['deaths']['value'];
      this.data.lastupdate= res['lastUpdate'];
    
    })
  }

  fetchCountries(){
    this.api.fetchCountries().subscribe((res:any[])=>{
      var countries = res ['countries'];
      this.countries = countries.map((name)=>{return name['name']})
      
    })
  }

  fetchDataByCountry(country:string){
    this.api.fetchDataByCountry(country).subscribe((res: any[]) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastupdate = res['lastUpdate'];
      
      this.barChartData = [
        {
          data: [this.data.confirmed, this.data.recovered, this.data.deaths],
          label: 'People'
        }
      ];
    })
  }

  fetchDailyData() {
    this.api.fetchDailyData().subscribe((res: any[]) => {
      this.lineChartLabels = res.map((date) => date['reportDate']);
      var infectedData = res.map((confirmed) => confirmed['totalConfirmed']);
      var deaths = res.map((deaths) => deaths['deaths']['total']);
      var recovered = res.map((rev) => rev);
      console.log(infectedData,deaths)
      this.lineChartData = [
        {
          data: infectedData,
          label: 'Infected'
        },
        {
          data: deaths,
          label: 'Deaths'
        }
      ];
    });
  }

  countryChanged(value: string) {
    this.country = value;
    if(value == 'global') {
      this.fetchData();
      this.global = true;
    } else {
      this.fetchDataByCountry(value);
      this.global = false;
    }
  }

  ngAfterViewInit(){
    $(document).ready(function(){
      $(window).scroll(function(){
        if($('.navbar').offset().top > 200){
          $('.bg-transparent').addClass('navbarChangeColor')
          $('.navbar-toggler').addClass('boderChangeColor')
        }else{
          $('.bg-transparent').removeClass('navbarChangeColor')
          $('.navbar-toggler').removeClass('boderChangeColor')
        }
        
      })

    })
  }

}
