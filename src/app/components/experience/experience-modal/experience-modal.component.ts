import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Experience} from '../experience.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {ExperienceService} from '../../../services/experience.service';

@Component({
  selector: 'app-experience-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatNativeDateModule,
    MatButton
  ],
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.css']
})
export class ExperienceModalComponent {
  private fb = inject(FormBuilder);
  private experienceService = inject(ExperienceService);
  private dialogRef = inject(MatDialogRef<ExperienceModalComponent>);
  public data = inject<Experience>(MAT_DIALOG_DATA);

  experienceForm: FormGroup = this.fb.group({
    title: [this.data?.title || ''],
    startDate: [this.data?.startDate || null],
    endDate: [this.data?.endDate || null],
    responsibilities: this.fb.array(this.data?.responsibilities || []),
    skills: [this.data?.skills?.join(', ') || '']
  });

  get responsibilities(): FormArray {
    return this.experienceForm.get('responsibilities') as FormArray;
  }

  addResponsibility() {
    this.responsibilities.push(new FormControl('', Validators.required));
  }


  save() {
    if (this.experienceForm.valid) {
      const formValues = this.experienceForm.value;

      formValues.skills = formValues.skills?.split(',')
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill) || [];

      if (this.data?.id) {
        this.experienceService.updateExperience(this.data.id, formValues).subscribe({
          next: (updatedExperience) => {
            this.dialogRef.close(updatedExperience);
          },
          error: (error) => {
            console.error('Error updating experience', error);
          }
        });
      } else {
        this.experienceService.createExperience(formValues).subscribe({
          next: (newExperience) => {
            this.dialogRef.close(newExperience);
          },
          error: (error) => {
            console.error('Error creating experience', error);
          }
        });
      }
    }
  }


  close() {
    this.dialogRef.close();
  }
}
