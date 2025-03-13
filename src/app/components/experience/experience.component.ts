import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExperienceService} from '../../services/experience.service';
import {Experience} from './experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  private experienceService = inject(ExperienceService);

  ngOnInit() {
    this.experienceService.getExperience().subscribe(data => {
      this.experiences = data;
    });
  }
}
