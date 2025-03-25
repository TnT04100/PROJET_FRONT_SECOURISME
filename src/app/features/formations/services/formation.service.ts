import {Injectable} from '@angular/core';
import Formation from '../models/formation.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import Formateurs from '../../formateurs/models/formateurs.interface';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiUrl = "http://172.16.64.193:8080/api/v1/formations/";

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


  getAll(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl, this.getHttpOptions());
  }

  getById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}${id}/`, this.getHttpOptions());
  }

  save(formation: Formation): Subscription {
    if (!formation) {
      throw new Error("Pas d'id de formation");
    }
    if (formation.id) {
      return this.http.put<Formateurs>(`${this.apiUrl}${formation.id}/`, formation, this.getHttpOptions()).subscribe(
        {
          next: (response) => console.log("Reponse de l'Api", response)
        }
      );
    } else {
      return this.http.post<Formateurs>(this.apiUrl, formation, this.getHttpOptions()).subscribe(
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
