import {inject, Injectable} from '@angular/core';
import {API_URL} from '../app.config';
import {HttpClient} from '@angular/common/http';
import {catchError, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService{
  private apiURL = inject(API_URL)
  private http = inject(HttpClient)

  private readonly DEFAULT_ABOUT_DESCRIPTION =
'I am a frontend developer specializing in Angular and React, focused on building scalable, user-friendly, and high-performance web applications. I also have experience with backend technologies like NestJS, and have contributed to game development projects. I enjoy collaborating with teams to deliver innovative solutions, continuously expanding my skills, and tackling new challenges that create meaningful impact through software.'
  getAboutDescription() {
    return this.http
      .get<{ description: string }>(`${this.apiURL}/about`)
      .pipe(
        catchError(() =>
          of({ description: this.DEFAULT_ABOUT_DESCRIPTION })
        )
      );
  }

  editDescription(description: string) {
    return this.http.put(`${this.apiURL}/about/1`, { description });
  }

}
