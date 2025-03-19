import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  login(identifiant: string, motDePasse: string):any {
    return this.http.post(`${this.apiUrl}/login`, { identifiant, motDePasse });
  }
}
