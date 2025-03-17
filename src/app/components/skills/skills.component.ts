import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillsService} from '../../services/skills.service';
import {Category} from './skills.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skills: Category[] = [];
  private skillsService = inject(SkillsService);

  ngOnInit() {
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
      }
    });
  }
}
