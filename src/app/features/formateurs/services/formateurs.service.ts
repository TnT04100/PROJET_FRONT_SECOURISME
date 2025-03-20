import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import Formateurs from '../models/formateurs.interface';

@Injectable({
  providedIn: 'root'
})
export class FormateursService {
  private apiUrl = "http://172.16.64.193:8080/api/v1/formateurs/";

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<Formateurs[]> {
    return this.http.get<Formateurs[]>(this.apiUrl, this.getHttpOptions());
  }

  getById(id: number): Observable<Formateurs> {
    return this.http.get<Formateurs>(`${this.apiUrl}${id}/`, this.getHttpOptions());
  }

  save(formateur: Formateurs): Subscription {
    if (!formateur) {
      throw new Error("Pas d'id de formateur");
    }
    if (formateur.id) {
      return this.http.put<Formateurs>(`${this.apiUrl}${formateur.id}/`, formateur, this.getHttpOptions()).subscribe(
        {
          next: (response) => console.log("Reponse de l'Api", response)
        }
      );
    } else {
      return this.http.post<Formateurs>(this.apiUrl, formateur, this.getHttpOptions()).subscribe(
        {
          next: (response) => {
            console.log("Réponse de l'API : ", response);
          }
        }
      );
    }
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, this.getHttpOptions());
  }
}
