import {Injectable} from '@angular/core';

import {Civilite} from '../models/civilite.type';
import Stagiaire from '../models/formateurs.interface';
import Formateurs from '../models/formateurs.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormateursService {

  private apiUrl = "http://172.16.64.193:8080/api/v1/formateurs/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Formateurs[]> {
    return this.http.get<Formateurs[]>(this.apiUrl);
  }

  getById(id: number): Observable<Formateurs> {
    return this.http.get<Formateurs>(`${this.apiUrl}${id}/`);
  }

  save(formateur: Formateurs): Subscription {
    if (!formateur) {
      throw new Error("Pas d'id de formateur");
    }
    if (formateur.id) {
      console.log("Passage avec ID")
      return this.http.put<Formateurs>(`${this.apiUrl}${formateur.id}/`,formateur,this.httpOptions).subscribe(
        {
          next: (response) => console.log("Reponse de l'Api",response)
        }
      )
    }
    else {
      console.log("Passage sans ID")
      return this.http.post<Formateurs>(`${this.apiUrl}`,formateur,this.httpOptions).subscribe(
        {
          next: (response) => {
            console.log("Réponse de l'API : ", response);
          }
        }
      );
    }
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

}
