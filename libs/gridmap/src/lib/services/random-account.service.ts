import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface ResponseObject {
  results?: (RandomVehicle)[] | null;
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface RandomVehicle {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  dob: string;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  postcode: number;
}

export interface Id {
  name: string;
  value: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class RandomVehicleService  {
  // public url = 'https://randomuser.me/api/?nat=us&results=100&exc=login,registered&seed=sumo';
  public baseUrl = 'https://randomuser.me/api/';
  params = new HttpParams()
    .append('seed', 'sumo')
    .append('nat', 'us')
    .append('exc', 'login,registered');

  constructor(private httpClient: HttpClient) {
  }

  getAll(pageSize : number = 100) {
    const params = this.params.append('results', ''+ pageSize);
    return this.httpClient.get<ResponseObject>(this.baseUrl, { params }).pipe(
      map((response: ResponseObject) => response.results)
    )
  }

  getById(id: string) {
      const params = this.params
        .append('id', id)
        .append('results', '1');
    return this.httpClient.get<ResponseObject>(this.baseUrl, { params }).pipe(
      map((response: ResponseObject) => response.results[0])
    )
  }
}
