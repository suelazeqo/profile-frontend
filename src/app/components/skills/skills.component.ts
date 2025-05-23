import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillsService} from '../../services/skills.service';
import {Category, SkillsModalData} from './skills.model';
import {MatDialog} from '@angular/material/dialog';
import {SkillsModalComponent} from './skills-modal/skills-modal.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  categories: Category[] = [];
  openCategory: number | null = null;
  private skillsService = inject(SkillsService);
  public authService = inject(AuthService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadingSkills()
  }
  toggleCategory(index: number) {
    this.openCategory = this.openCategory === index ? null : index;
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

    dialogRef.afterClosed().subscribe(() => {
      this.loadingSkills()
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
      this.loadingSkills()
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
