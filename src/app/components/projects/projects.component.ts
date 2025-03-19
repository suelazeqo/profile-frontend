import {Component, inject, OnInit} from '@angular/core';
import {Project} from './projects.model';
import {ProjectsService} from '../../services/projects.service';
import {CommonModule, NgForOf} from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone:true,
  imports: [
    CommonModule,
    NgForOf
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{
  projects: Project[]= [];

  private projectsService = inject(ProjectsService);

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data)=>{
      this.projects = data
    })
  }
  addProjects(){}
}
