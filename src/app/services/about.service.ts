import {inject, Injectable} from '@angular/core';
import {API_URL} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService{
  private apiURL = inject(API_URL)
  private http = inject(HttpClient)

  getAboutDescription(){
    return this.http.get<{ description: string }>(`${this.apiURL}/about`);
  }
  editDescription(description: string) {
    return this.http.put(`${this.apiURL}/about/1`, { description });
  }

}
