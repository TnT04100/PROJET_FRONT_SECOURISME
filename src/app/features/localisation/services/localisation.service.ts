import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localisation } from '../models/localisation.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  private apiUrl = "http://172.16.64.193:8080/api/v1/localisations/";

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<Localisation[]> {
    return this.http.get<Localisation[]>(this.apiUrl, this.getHttpOptions());
  }

  getById(id: number): Observable<Localisation> {
    return this.http.get<Localisation>(`${this.apiUrl}${id}/`, this.getHttpOptions());
  }

  save(localisation: Localisation): Observable<Localisation> {
    if (localisation.id) {
      return this.http.put<Localisation>(`${this.apiUrl}${localisation.id}/`, localisation, this.getHttpOptions());
    } else {
      return this.http.post<Localisation>(this.apiUrl, localisation, this.getHttpOptions());
    }
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, this.getHttpOptions());
  }
}
