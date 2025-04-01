import {Injectable, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
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
