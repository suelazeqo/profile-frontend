import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProjectsService} from '../../../services/projects.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Project} from '../projects.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectsService);
  private dialogRef = inject(MatDialogRef<ProjectModalComponent>);
  public data = inject<Project>(MAT_DIALOG_DATA);

  imageFile: File | null = null;
  imagePreview: string | null = this.data?.image || null;

  projectForm: FormGroup = this.fb.group({
    image: [this.data?.image || ''],
    title: [this.data?.title || '', Validators.required],
    description: [this.data?.description || '', Validators.required],
    skills: [this.data?.skills.join(', ') || '', Validators.required],
    link: [this.data?.link || '']
  });
  private selectedFile: any;

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    if (this.projectForm.valid) {
      const formValues = this.projectForm.value;

      const skillsArray = formValues.skills
        ?.split(',')
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill) || [];

      const payload: any = {
        title: formValues.title,
        description: formValues.description,
        skills: skillsArray,
        link: formValues.link
      };

      if (this.imageFile) {
        const formData = new FormData();
        formData.append('file', this.imageFile);

        this.projectService.uploadImage(formData).subscribe({
          next: (res) => {
            payload.image = res.imageUrl;
            this.sendPayload(payload);
          },
          error: (err) => console.error('Error uploading image', err),
        });
      } else {
        if (this.imagePreview) {
          payload.image = this.imagePreview;
        }
        this.sendPayload(payload);
      }
    }
  }


  sendPayload(payload: any) {
    if (this.data?.id) {
      this.projectService.updateProject(this.data.id, payload).subscribe({
        next: (updatedProject) => this.dialogRef.close(updatedProject),
        error: (err) => console.error('Error updating project', err),
      });
    } else {
      this.projectService.createProject(payload).subscribe({
        next: (newProject) => this.dialogRef.close(newProject),
        error: (err) => console.error('Error creating project', err),
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
