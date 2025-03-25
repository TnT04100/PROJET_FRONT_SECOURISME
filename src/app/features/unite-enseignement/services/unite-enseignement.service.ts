import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import Formateurs from '../../formateurs/models/formateurs.interface';
import {UniteEnseignement} from '../models/unite-enseignement.interface';

@Injectable({
  providedIn: 'root'
})
export class UniteEnseignementService {

  private apiUrl = "http://172.16.64.193:8080/api/v1/unite-enseignements/";

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


  getAll(): Observable<UniteEnseignement[]> {
    return this.http.get<UniteEnseignement[]>(this.apiUrl, this.getHttpOptions());
  }

  getById(id: number): Observable<UniteEnseignement> {
    return this.http.get<UniteEnseignement>(`${this.apiUrl}${id}/`, this.getHttpOptions());
  }

  save(uniteEnseignement: UniteEnseignement): Subscription {
    if (!uniteEnseignement) {
      throw new Error("Pas d'id de formation");
    }
    if (uniteEnseignement.id) {
      return this.http.put<UniteEnseignement>(`${this.apiUrl}${uniteEnseignement.id}/`, uniteEnseignement, this.getHttpOptions()).subscribe(
        {
          next: (response) => console.log("Reponse de l'Api", response)
        }
      );
    } else {
      return this.http.post<UniteEnseignement>(this.apiUrl, uniteEnseignement, this.getHttpOptions()).subscribe(
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
