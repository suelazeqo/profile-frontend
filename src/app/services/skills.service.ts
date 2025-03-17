import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URL} from '../app.config';
import {Category} from '../components/skills/skills.model';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  getSkills(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/skills`);
  }
}
