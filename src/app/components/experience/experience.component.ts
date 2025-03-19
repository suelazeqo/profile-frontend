import {Component, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExperienceService} from '../../services/experience.service';
import {Experience} from './experience.model';
import {ExperienceModalComponent} from './experience-modal/experience-modal.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {provideNativeDateAdapter} from '@angular/material/core';

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

  private experienceService = inject(ExperienceService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.experienceService.getExperience().subscribe(data => {
      this.experiences = data;
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ExperienceModalComponent, {
      width: '500px',
      data: {title: '', startDate: null, endDate: null, responsibilities: [], skills: []}
    });

    dialogRef.afterClosed().subscribe((newExperience: Experience) => {
      if (newExperience) {
        this.experiences.push(newExperience);
      }
    });
  }


}
