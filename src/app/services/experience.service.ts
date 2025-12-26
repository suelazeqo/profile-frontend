import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Experience} from '../components/experience/experience.model';
import {API_URL} from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class ExperienceService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);
  DEFAULT_EXPERIENCE: Experience[] = [
    {
      id: 1,
      startDate: '2023-05-01',
      endDate: '',
      title: 'Frontend Developer',
      company: 'OneSoft sh.p.k part of Zetta Hosting Solutions',
      responsibilities: [
        'Responsible for developing interactive user interfaces for software and gaming applications using Angular, React, Svelte, and SolidJS. Collaborated with cross-functional teams to implement features, resolve technical issues, and ensure high performance and cross-browser compatibility. Integrated gaming frameworks to enhance mechanics and visual effects, while maintaining clean, efficient code. Continuously tested, debugged, and stayed current with frontend and gaming technology trends to deliver innovative and seamless user experiences.'      ],
      skills: ['Angular', 'React', 'TypeScript','NestJS', 'Angular Material', 'MUI', 'Nebular', 'PostgreSQL']
    },
    {
      id: 2,
      startDate: '2022-02-01',
      endDate: '2023-05-01',
      title: 'Software Developer',
      company: 'Innovaway',
      responsibilities: [
        'Responsible for designing and implementing responsive user interfaces using Angular and React. Ensured cross-browser compatibility, performance optimization, and accessibility for a seamless user experience. Collaborated closely with designers and backend developers to deliver features and resolve technical issues. Maintained clean, tested code while staying up to date with advancements in frontend development and UX best practices.'
      ],
      skills: ['Angular', 'React', 'TypeScript', 'Angular Material','Figma']
    },
    {
      id: 3,
      startDate: '2021-05-01',
      endDate: '2022-02-01',
      title: 'Web developer and SEO specialist',
      company: 'Clickwise Digital',
      responsibilities: [
        'Responsible for designing, developing, and maintaining websites and web applications using Angular, HTML, CSS, JavaScript, WordPress, and Shopify. I implemented SEO best practices through keyword research, on-page optimization, and content creation. I used tools like Google Analytics and Search Console to track performance and user behavior, and SEMrush for keyword monitoring and competitor analysis. I also ensured that all websites were responsive, user-friendly, fast, and compliant with modern web standards.'
      ],
      skills: ['WordPress', 'Shopify','SEO', 'Angular', 'HTML5', 'CSS3']
    },
     {
      id: 4,
      startDate: '2019-01-01',
      endDate: '2021-05-01',
      title: 'Web developer ',
      company: 'Freelance',
      responsibilities: [
        'Designing, coding, and implementing WordPress and Shopify websites, including customizing themes and plugins'
      ],
      skills: ['WordPress', 'Shopify','SEO', 'HTML', 'CSS3']
    },
    {
      id: 5,
      startDate: '2019-01-01',
      endDate: '2021-02-01',
      title: 'University Professor ',
      company: 'Fan Noli University',
      responsibilities: [
        'Deliver lectures on statistical and analytic concepts, methods, and applications. Create and grade assignments and exams. Offer individual support to students. Develop and update course materials, including syllabi, lecture slides, and readings.'
      ],
      skills: ['Statistics','Math Analysis']
    },
     {
      id: 6,
      startDate: '2016-01-01',
      endDate: '2019-07',
      title: 'Web developer and social media manager',
      company: 'Forever Living Products for Branch office Tirana',
      responsibilities: [
        'Managed company website operations, including product updates, design changes, and content creation. Collaborated with designers, developers, and stakeholders to implement WordPress design changes. Monitored website analytics, identified areas for improvement, and developed optimization strategies.'
      ],
      skills: ['WordPress']
    },
  ];

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`).pipe(
      catchError(() => of(this.DEFAULT_EXPERIENCE))
    );
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
