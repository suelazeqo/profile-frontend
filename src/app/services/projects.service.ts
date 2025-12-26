import {inject, Injectable} from '@angular/core';
import {API_URL} from '../app.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Project} from '../components/projects/projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiURL = inject(API_URL)
  private http = inject(HttpClient)
  DEFAULT_PROJECTS: Project[] = [
    {
      id: 1,
      image: 'assets/img/profile.png',
      title: 'Portfolio Website',
      description: 'This personal profile page is built using Angular with the latest standalone components and styled using Angular Material for a clean and modern UI. The backend is powered by NestJS, connected to a PostgreSQL database for robust and efficient data handling.',
      skills: ['Fullstack', 'Angular', 'TypeScript', 'NestJS', 'Angular Material', 'PostgreSQL', 'TypeORM', 'JWT Authentication'],
      link: 'https://suelazeqo.github.io/profile-frontend/'
    },
    {
      id: 2,
      image: 'assets/img/sky-glide.png',
      title: 'Sky Glide Game',
      description: 'Sky Glide is a 2D browser-based game built with Phaser 3 and Webpack. The project uses a custom boilerplate setup that includes optimized asset management, modular game scene handling, and efficient Webpack configurations for seamless development and deployment. This template provides a flexible structure for creating smooth, engaging games for modern web browsers.',
      skills: ['Phaser','Webpack', 'Html Canvas', 'JavaScript'],
      link: 'https://suelazeqo.github.io/sky-glide/'
    },
    {
      id: 3,
      image: 'assets/img/github-finder.png',
      title: 'GitHub Finder',
      description: 'GitHub Finder is a React-based web application that allows users to search for GitHub profiles and view detailed user data including repositories, followers, and more. It integrates the GitHub API, offers a responsive UI styled with TailwindCSS and DaisyUI, and uses React Router for navigation. The app is deployed via GitHub Pages for easy access and sharing.',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'DaisyUI', 'Axios'],
      link: 'https://suelazeqo.github.io/github-finder/'
    },
    {
      id: 4,
      image: 'assets/img/pacman.png',
      title: 'Pacman Game',
      description: 'Pocman Game is a fun, browser-based Pacman-style game built using Angular. The game features real-time movement, score tracking, and simple collision detection. It\'s designed to run smoothly in the browser with a focus on interactive gameplay and clean component-based architecture.',
      skills: ['Angular', 'TypeScript', 'RxJS'],
      link: 'https://suelazeqo.github.io/pacman-game'
    },
        {
      id: 5,
      image: 'assets/img/o-shop.png',
      title: 'O-Shop',
      description: 'O-Shop is an e-commerce platform built with Angular and NestJS. It features a user-friendly interface, secure authentication, and a robust backend connected to a PostgreSQL database. The application supports product management, shopping cart functionality, and order processing.',
      skills: ['Angular', 'Angular Material', 'TypeScript'],
      link: 'https://suelazeqo.github.io/o-shop'
    }
  ]

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiURL}/projects`).pipe(
      catchError(() => of(this.DEFAULT_PROJECTS))
    );
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
