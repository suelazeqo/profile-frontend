import {inject, Injectable} from '@angular/core';
import {API_URL} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../components/projects/projects.model';

@Injectable({
  providedIn:'root'
})
export class ProjectsService {
  private apiURL = inject(API_URL)
  private http = inject(HttpClient)

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiURL}/projects`);
  }
}
