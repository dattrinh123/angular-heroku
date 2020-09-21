import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = "https://covid19.mathdro.id/api";
  constructor(private http:HttpClient) { }

  fetchData = ()=>{
    return this.http.get(this.url);
  }

  fetchDataByCountry = (country:string)=>{
    return this.http.get(this.url +`/countries/`+country)
  }

  fetchDailyData = ()=>{
    return this.http.get(this.url + `/daily`)
  }

  fetchCountries = () =>{
    return this.http.get(this.url +`/countries`)
  }
}
