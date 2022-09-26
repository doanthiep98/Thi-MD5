import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { Tour } from '../model/tour';
import {Observable} from "rxjs";

// const API_URL = "http://localhost:3000/tuors"

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>("http://localhost:3000/tuors")
  }

  getTourById(id?: number): Observable<Tour> {
    return this.http.get<Tour>("http://localhost:3000/tuors/" + id);
  }

  createTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>("http://localhost:3000/tuors", tour);
  }

  updateTour(id?: number, tour?: Tour): Observable<Tour> {
    return this.http.put<Tour>("http://localhost:3000/tuors/" + id, tour);
  }

  deleteTour(id?: number) {
    return this.http.delete("http://localhost:3000/tuors/" + id);
  }
}
