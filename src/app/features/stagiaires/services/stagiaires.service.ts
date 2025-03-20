import {Injectable} from '@angular/core';


import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import Stagiaires from '../../formateurs/models/formateurs.interface';

@Injectable({
  providedIn: 'root'
})
export class StagiairesService {

  private apiUrl = "http://172.16.64.193:8080/api/v1/stagiaires/";

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

  getAll(): Observable<Stagiaires[]> {
    return this.http.get<Stagiaires[]>(this.apiUrl, this.getHttpOptions());
  }

  getById(id: number): Observable<Stagiaires> {
    return this.http.get<Stagiaires>(`${this.apiUrl}${id}/`, this.getHttpOptions());
  }

  save(stagiaire: Stagiaires): Subscription {
    if (!stagiaire) {
      throw new Error("Pas d'id de stagiaire");
    }
    if (stagiaire.id) {
      return this.http.put<Stagiaires>(`${this.apiUrl}${stagiaire.id}/`, stagiaire, this.getHttpOptions()).subscribe(
        {
          next: (response) => console.log("Reponse de l'Api", response)
        }
      );
    } else {
      return this.http.post<Stagiaires>(this.apiUrl, stagiaire, this.getHttpOptions()).subscribe(
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
