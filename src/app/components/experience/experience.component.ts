import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperienceService} from '../../services/experience.service';
import {Experience} from './experience.model';
import {ExperienceModalComponent} from './experience-modal/experience-modal.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {provideNativeDateAdapter} from '@angular/material/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  showAll = false;

  private experienceService = inject(ExperienceService);
  private dialog = inject(MatDialog);
  public authService = inject(AuthService);

  ngOnInit() {
    this.loadExperiences()
  }

  loadExperiences() {
    this.experienceService.getExperience().subscribe(data => {
      this.experiences = data;
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ExperienceModalComponent, {
      width: '500px',
      panelClass: 'no-scroll-modal',
      data: {title: '', company: '', startDate: null, endDate: null, responsibilities: [], skills: []}
    });

    dialogRef.afterClosed().subscribe((newExperience: Experience) => {
      if (newExperience) {
        this.experiences.push(newExperience);
      }
    });
  }

  deleteExperience(id: number) {
    this.experienceService.deleteExperience(id).subscribe({
      next: () => {
        this.loadExperiences();
      },
      error: (error) => {
        console.error('Error deleting experience:', error);
      }
    });
  }

  editExperience(id: number) {
    const experienceToEdit = this.experiences.find(exp => exp.id === id);
    if (!experienceToEdit) return;

    const dialogRef = this.dialog.open(ExperienceModalComponent, {
      width: '500px',
      panelClass: 'no-scroll-modal',
      data: experienceToEdit
    });

    dialogRef.afterClosed().subscribe((updatedExperience: Experience) => {
      if (updatedExperience) {
        this.experiences = this.experiences.map(exp =>
          exp.id === updatedExperience.id ? updatedExperience : exp
        );
      }
    });
  }
  get visibleExperiences() {
    return this.showAll ? this.experiences : this.experiences.slice(0, 2);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
