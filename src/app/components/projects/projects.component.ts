import {Component, inject, OnInit} from '@angular/core';
import {Project} from './projects.model';
import {ProjectsService} from '../../services/projects.service';
import {CommonModule, NgForOf} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ProjectModalComponent} from './project-modal/project-modal.component';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    MatDialogModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  private projectsService = inject(ProjectsService);
  private dialog = inject(MatDialog);
  public authService = inject(AuthService);


  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects() {
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data
    })
  }

  addProjects() {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '500px',
      panelClass: 'no-scroll-modal',
      data: {image: '', title: '', description: '', skills: []}
    })

    dialogRef.afterClosed().subscribe((newProject: Project) => {
      if (newProject) {
        this.projects.push(newProject)
      }
    })
  }

  editProject(id: number) {
    const projectToEdit = this.projects.find(proj => proj.id === id);
    if (!projectToEdit) return;

    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '500px',
      panelClass: 'no-scroll-modal',
      data: projectToEdit
    })

    dialogRef.afterClosed().subscribe((updatedProject: Project) => {
      if (updatedProject) {
        this.projects = this.projects.map(proj =>
          proj.id === updatedProject.id ? updatedProject : proj
        )
      }
    })
  }

  deleteProject(id: number) {
    this.projectsService.deleteProject(id).subscribe({
      next: () => {
        this.loadProjects();
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      }
    })
  }
}
