import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsService} from '../../services/skills.service';
import {Category, SkillsModalData} from './skills.model';
import {MatDialog} from '@angular/material/dialog';
import {SkillsModalComponent} from './skills-modal/skills-modal.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  categories: Category[] = [];
  private skillsService = inject(SkillsService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadingSkills()
  }

  loadingSkills() {
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
      }
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(SkillsModalComponent, {
      width: '500px',
      panelClass: 'no-scroll-modal',
      data: {
        mode: 'create',
        selectedCategory: null,
        selectedSubcategory: null,
        selectedSkills: [],
      }
    })

    dialogRef.afterClosed().subscribe((newCategory: Category) => {
      if (newCategory) {
        this.categories.push(newCategory);
      }
    });
  }

  editCategory(id: number) {
    const categoryToEdit = this.categories.find(cat => cat.id === id);
    if (!categoryToEdit) return;

    const dialogRef = this.dialog.open(SkillsModalComponent, {
      width: '500px',
      panelClass: 'no-scroll-modal',
      data: {
        mode: 'edit',
        selectedCategory: categoryToEdit
      } as SkillsModalData
    });

    dialogRef.afterClosed().subscribe((updatedCategory: Category) => {
      if (updatedCategory) {
        this.categories = this.categories.map(exp =>
          exp.id === updatedCategory.id ? updatedCategory : exp
        );
      }
    });
  }

  deleteCategory(id: number) {
    this.skillsService.deleteCategory(id).subscribe({
      next: () => {
        this.loadingSkills();
      },
      error: (error) => {
        console.error('Error deleting experience:', error);
      }
    })
  }
}
