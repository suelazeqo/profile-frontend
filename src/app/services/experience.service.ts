import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Experience} from '../components/experience/experience.model';
import {API_URL} from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class ExperienceService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }
}
