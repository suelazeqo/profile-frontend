import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Experience} from '../components/experience/experience.model';
import {API_URL} from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class ExperienceService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }

  createExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiUrl}/experience`, experience, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    })
  }

  deleteExperience(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/experience/${id}`);
  }

  updateExperience(id: number, experienceData: Experience) {
    return this.http.put<Experience>(`${this.apiUrl}/experience/${id}`, experienceData);
  }
}
