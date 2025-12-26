import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {API_URL} from '../app.config';
import {Category} from '../components/skills/skills.model';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  private apiUrl = inject(API_URL);
  private http = inject(HttpClient);

  // DEFAULT_SKILLS: Category[] = [
  //   {
  //     id: 1,
  //     name: 'Development & Programming',
  //     subcategories: [
  //       {
  //         id: 11,
  //         name: 'Programming Languages',
  //         skills: [
  //           { id: 111, name: 'HTML' },
  //           { id: 112, name: 'JavaScript' },
  //           { id: 113, name: 'TypeScript' },
  //           { id: 114, name: 'CSS/SCSS' },
  //           { id: 115, name: 'PHP' },
  //         ],
  //       },
  //       {
  //         id: 12,
  //         name: 'Frameworks',
  //         skills: [
  //           { id: 121, name: 'Angular' },
  //           { id: 122, name: 'React' },
  //           { id: 122, name: 'NestJs' },
  //           { id: 122, name: 'Svelte' },
  //           { id: 122, name: 'SolidJs' },
  //           { id: 122, name: 'Phaser' },
  //           { id: 122, name: 'Express' }
  //         ],
  //       },
  //       {
  //         id: 13,
  //         name: 'UI Libraries',
  //         skills: [
  //           { id: 121, name: 'Bootstrap' },
  //           { id: 122, name: 'Angular Material' },
  //           { id: 122, name: 'Material UI' },
  //           { id: 122, name: 'TailwindCSS' },
  //           { id: 122, name: 'Nebular' },
  //           { id: 122, name: 'DaisyUI' },
  //
  //         ],
  //       },
  //
  //       {
  //         id: 14,
  //         name: 'Database/Database Tools',
  //         skills: [
  //           { id: 121, name: 'MySQL' },
  //           { id: 122, name: 'PostgreSQL' },
  //           { id: 122, name: 'PgAdmin' },
  //           { id: 122, name: 'SolidJs' },
  //           { id: 122, name: 'TypeORM' },
  //         ],
  //       },
  //       {
  //         id: 14,
  //         name: 'State Management',
  //         skills: [
  //           { id: 121, name: 'RxJs' },
  //           { id: 122, name: 'NgRx' },
  //           { id: 122, name: 'Redux' },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Tools & Technologies',
  //     subcategories: [
  //       {
  //         id: 12,
  //         name: 'Cloud & DevOps',
  //         skills: [
  //           { id: 121, name: 'Docker' },
  //           { id: 122, name: 'AWS' },
  //         ],
  //       },
  //       {
  //         id: 12,
  //         name: 'Version Control',
  //         skills: [
  //           { id: 121, name: 'GitHub' },
  //           { id: 122, name: 'GitLab' },
  //         ],
  //       },
  //       {
  //         id: 12,
  //         name: 'API & Security Tools',
  //         skills: [
  //           { id: 121, name: 'Postman' },
  //           { id: 122, name: 'Axios' },
  //           { id: 122, name: 'multer' },
  //           { id: 122, name: 'JWT Authentication' },
  //           { id: 122, name: 'bcrypt' },
  //           { id: 122, name: 'class-validators' },
  //         ],
  //       },
  //       {
  //         id: 12,
  //         name: 'Design & Prototyping',
  //         skills: [
  //           { id: 121, name: 'Figma' },
  //         ],
  //       },
  //
  //     ],
  //   }, {
  //     id: 2,
  //     name: 'Digital Presence & Optimization',
  //     subcategories: [
  //       {
  //         id: 12,
  //         name: 'CMS & E-commerce',
  //         skills: [
  //           { id: 121, name: 'Wordpress' },
  //           { id: 122, name: 'Shopify' },
  //         ],
  //       },
  //       {
  //         id: 12,
  //         name: 'SEO & Analytics',
  //         skills: [
  //           { id: 122, name: 'SEO' },
  //           { id: 121, name: 'Semrush' },
  //           { id: 121, name: 'Google Analytics' },
  //           { id: 121, name: 'Search Console' },
  //         ],
  //       },
  //
  //     ],
  //   },
  // ];
  DEFAULT_SKILLS: Category[] = [
    {
      id: 1,
      name: 'Frontend Development',
      subcategories: [
        {
          id: 11,
          name: 'Core Technologies',
          skills: [
            { id: 111, name: 'HTML & CSS (SCSS)' },
            { id: 112, name: 'JavaScript (ES6+)' },
            { id: 113, name: 'TypeScript' },
          ],
        },
        {
          id: 12,
          name: 'Frameworks & Libraries',
          skills: [
            { id: 121, name: 'Angular' },
            { id: 122, name: 'React' },
            { id: 123, name: 'Svelte' },
            { id: 124, name: 'SolidJs' },
            { id: 125, name: 'Phaser' },
          ],
        },
        {
          id: 13,
          name: 'UI & Styling',
          skills: [
            { id: 131, name: 'Tailwind CSS' },
            { id: 132, name: 'Angular Material' },
            { id: 133, name: 'Material UI' },
            { id: 134, name: 'Nebular' },
            { id: 135, name: 'Bootstrap' },
          ],
        },
        {
          id: 14,
          name: 'State Management',
          skills: [
            { id: 141, name: 'RxJS' },
            { id: 142, name: 'NgRx' },
            { id: 143, name: 'Redux Toolkit' },
          ],
        },
      ],
    },

    {
      id: 2,
      name: 'Backend & APIs',
      subcategories: [
        {
          id: 21,
          name: 'Backend Frameworks',
          skills: [
            { id: 211, name: 'Node.js' },
            { id: 212, name: 'NestJS' },
            { id: 213, name: 'Express.js' },
          ],
        },
        {
          id: 22,
          name: 'Databases & ORM',
          skills: [
            { id: 221, name: 'PostgreSQL' },
            { id: 222, name: 'MySQL' },
            { id: 223, name: 'TypeORM' },
          ],
        },
        {
          id: 23,
          name: 'Authentication & Security',
          skills: [
            { id: 231, name: 'JWT Authentication' },
            { id: 232, name: 'Authorization' },
            { id: 233, name: 'Secure API development' },
            { id: 233, name: 'Input validation' },
          ],
        },
      ],
    },

    {
      id: 3,
      name: 'Tools & Engineering',
      subcategories: [
        {
          id: 32,
          name: 'DevOps & Workflow',
          skills: [
            { id: 321, name: 'Docker' },
            { id: 322, name: 'AWS' },
            { id: 323, name: 'GitHub / GitLab' },
          ],
        },
        {
          id: 33,
          name: 'Build & Tooling',
          skills: [
            { id: 331, name: 'Vite' },
            { id: 332, name: 'Webpack' },
          ],
        },
      ],
    },

    {
      id: 4,
      name: 'Design & Product',
      subcategories: [
        {
          id: 41,
          name: 'Design & UX',
          skills: [
            { id: 411, name: 'Figma' },
            { id: 412, name: 'Responsive Design' },
            { id: 413, name: 'Accessibility' },
          ],
        },
      ],
    },
  ];

  getSkills(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.apiUrl}/skills`)
      .pipe(
        catchError(() => of(this.DEFAULT_SKILLS))
      );
  }

  createCategory(categoryName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/skills/categories`, {name: categoryName}, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  createSubCategory(subCategoryName: string, categoryId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/skills/subcategories`, {name: subCategoryName, categoryId: categoryId}, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  createNewSkill(subCategoryName: string, subCategoryId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/skills`, {name: subCategoryName, subcategoryId: subCategoryId}, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
  }

  renameCategory(renamedCategory: string, categoryId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/skills/categories/${categoryId}`, {
      name: renamedCategory,
    });
  }

  renameSubcategory(renamedSubCategory: string, subcategoryId: number, categoryId: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/skills/subcategories/${subcategoryId}`, {
      name: renamedSubCategory,
      categoryId: categoryId
    });
  }

  deleteCategory(categoryId: number) {
    return this.http.delete<void>(`${this.apiUrl}/skills/category/${categoryId}`);
  }

  deleteSubCategory(subCategoryId: number) {
    return this.http.delete<void>(`${this.apiUrl}/skills/subcategory/${subCategoryId}`);
  }

  deleteSkill(skillId: number) {
    return this.http.delete<void>(`${this.apiUrl}/skills/${skillId}`);
  }
}
