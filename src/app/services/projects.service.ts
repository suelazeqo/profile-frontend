import {inject, Injectable} from '@angular/core';
import {API_URL} from '../app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../components/projects/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiURL = inject(API_URL)
  private http = inject(HttpClient)

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiURL}/projects`);
  }

  uploadImage(formData: FormData): Observable<{ imageUrl: string }> {
    return this.http.post<{ imageUrl: string }>(`${this.apiURL}/upload/image`, formData);
  }

  createProject(payload: any): Observable<any> {
    return this.http.post(`${this.apiURL}/projects`, payload, {
      headers: {'Content-Type': 'application/json'},
    });
  }

  updateProject(id: number, projectData: FormData) {
    return this.http.put<Project>(`${this.apiURL}/projects/${id}`, projectData)
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/projects/${id}`)
  }
}
