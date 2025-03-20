import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

interface LoginRequest{
  username:string;
  password:string;
}

interface JwtResponse{
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthentService {

  private apiUrl = 'http://172.16.64.193:8080/api/v1/auth';

  constructor(private http:HttpClient) { }

  login(loginRequest:LoginRequest):Observable<JwtResponse>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`,loginRequest);
  }
}
