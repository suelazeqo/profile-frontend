import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category, Skill, SkillsModalData, Subcategory} from '../skills.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatStep, MatStepLabel, MatStepper, MatStepperPrevious} from '@angular/material/stepper';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {CommonModule} from '@angular/common';
import {SkillsService} from '../../../services/skills.service';

@Component({
  selector: 'app-skills-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatStep,
    MatStepper,
    MatStepLabel,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatStepperPrevious,
    MatChipsModule
  ],
  templateUrl: './skills-modal.component.html',
  styleUrl: './skills-modal.component.css'
})
export class SkillsModalComponent implements OnInit {
  categoryForm!: FormGroup;
  subcategoryForm!: FormGroup;
  skillsForm!: FormGroup;

  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  addedSkills: Skill[] = [];

  isNewCategory = false;
  isNewSubcategory = false;
  isEditMode = false;
  allowRename = false;
  allowRenameSubcategory = false;

  skillInput = '';

  private skillsService = inject(SkillsService);

  constructor(
    public dialogRef: MatDialogRef<SkillsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SkillsModalData,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      category: [null, Validators.required],
      newCategoryName: [''],
      renameCategory: [''],
    });
  }

  ngOnInit() {
    this.isEditMode = this.data?.mode === 'edit';

    this.subcategoryForm = this.fb.group({
      subcategory: [this.data.selectedSubcategory || null, Validators.required],
      newSubcategoryName: [''],
      renameSubcategory: ['']
    });

    this.skillsForm = this.fb.group({skills: [[]]});

    if (this.data.selectedSkills?.length) {
      this.addedSkills = [...this.data.selectedSkills];
    }

    this.getCategories();

    this.categoryForm.get('renameCategory')?.valueChanges.subscribe(value =>
      this.allowRename = !!value?.trim()
    );

    this.subcategoryForm.get('subcategory')?.valueChanges.subscribe(value =>
      this.allowRenameSubcategory = !!value
    );
  }

  private patchSelectedCategory() {
    const selected = this.categories.find(cat => cat.id === this.data?.selectedCategory?.id);
    if (selected) {
      this.categoryForm.patchValue({category: selected});
    }
  }

  private updateFormControlValidators(controlName: string, enable: boolean, form: FormGroup) {
    const control = form.get(controlName);
    if (!control) return;

    if (enable) {
      control.setValidators([Validators.required]);
    } else {
      control.clearValidators();
      control.setValue('');
    }
    control.updateValueAndValidity();
  }

  toggleNewCategory() {
    this.isNewCategory = !this.isNewCategory;
    this.updateFormControlValidators('newCategoryName', this.isNewCategory, this.categoryForm);
    this.updateFormControlValidators('category', !this.isNewCategory, this.categoryForm);
    this.categoryForm.get('category')?.setValue(null);
  }

  toggleNewSubcategory() {
    this.isNewSubcategory = !this.isNewSubcategory;
    this.updateFormControlValidators('newSubcategoryName', this.isNewSubcategory, this.subcategoryForm);
    this.updateFormControlValidators('subcategory', !this.isNewSubcategory, this.subcategoryForm);
  }

  nextStep(stepper: MatStepper) {
    const {newCategoryName, category, renameCategory} = this.categoryForm.value;

    if (this.isNewCategory && !newCategoryName) {
      this.categoryForm.get('newCategoryName')?.setErrors({required: true});
      return;
    }

    const proceed = () => {
      if (this.isEditMode && renameCategory) {
        this.renameCategory(renameCategory, category.id);
      }
      stepper.next();
    };

    if (this.isNewCategory) {
      this.skillsService.createCategory(newCategoryName).subscribe({
        next: created => {
          this.categories.push(created);
          this.categoryForm.get('category')?.setValue(created);
          this.subcategories = created.subcategories || [];
          proceed();
        },
        error: err => console.error('Failed to create category:', err)
      });
    } else {
      if (!category) return;
      this.subcategories = category.subcategories || [];
      proceed();
    }
  }

  private renameCategory(name: string, categoryId: number) {
    this.skillsService.renameCategory(name, categoryId).subscribe({
      next: () => {
        const index = this.categories.findIndex(cat => cat.id === categoryId);
        if (index !== -1) {
          this.categories[index].name = name;
          this.categoryForm.patchValue({category: this.categories[index]});
        }
        this.categoryForm.get('renameCategory')?.reset();
      },
      error: err => console.error('Failed to rename category:', err)
    });
  }

  nextStep2(stepper: MatStepper) {
    const {newSubcategoryName, subcategory, renameSubcategory} = this.subcategoryForm.value;
    const selectedCategory = this.categoryForm.get('category')?.value;

    if (this.isNewSubcategory && (!newSubcategoryName || !selectedCategory?.id)) {
      this.subcategoryForm.get('newSubcategoryName')?.setErrors({required: true});
      return;
    }

    const proceed = () => {
      if (renameSubcategory) {
        this.renameSubcategory(renameSubcategory, subcategory.id, selectedCategory.id);
      }
      stepper.next();
    };

    if (this.isNewSubcategory) {
      this.skillsService.createSubCategory(newSubcategoryName, selectedCategory.id).subscribe({
        next: created => {
          this.subcategories.push(created);
          this.subcategoryForm.get('subcategory')?.setValue(created);
          this.subcategoryForm.get('newSubcategoryName')?.reset();
          this.toggleNewSubcategory();
          proceed();
        },
        error: err => console.error('Failed to create subcategory:', err)
      });
    } else {
      if (!subcategory) return;
      proceed();
    }
  }

  private renameSubcategory(name: string, subId: number, catId: number) {
    this.skillsService.renameSubcategory(name, subId, catId).subscribe({
      next: () => {
        const index = this.subcategories.findIndex(sub => sub.id === subId);
        if (index !== -1) {
          this.subcategories[index].name = name;
          this.subcategoryForm.patchValue({subcategory: this.subcategories[index]});
        }
        this.subcategoryForm.get('renameSubcategory')?.reset();
      },
      error: err => console.error('Failed to rename subcategory:', err)
    });
  }

  deleteSubcategory() {
    const subcategory = this.subcategoryForm.get('subcategory')?.value;
    if (!subcategory) return;

    this.skillsService.deleteSubCategory(subcategory.id).subscribe({
      next: () => this.subcategoryForm.get('subcategory')?.reset(),
      error: err => console.error('Failed to delete subcategory:', err)
    });
  }

  getCategories() {
    this.skillsService.getSkills().subscribe({
      next: data => {
        this.categories = data;
        if (this.isEditMode) this.patchSelectedCategory();
      },
      error: err => console.error('Failed to fetch categories:', err)
    });
  }

  get selectedSubcategorySkills(): any[] {
    const sub = this.subcategoryForm.get('subcategory')?.value;
    return sub?.skills || [];
  }

  addSkill(): void {
    const skillName = this.skillInput?.trim();
    const subcategoryControl = this.subcategoryForm.get('subcategory');
    const subcategory = subcategoryControl?.value;

    if (!skillName || !subcategory) return;

    this.skillsService.createNewSkill(skillName, subcategory.id).subscribe({
      next: (skill) => {
        const updatedSub = {
          ...subcategory,
          skills: [...(subcategory.skills || []), skill]
        };

        subcategoryControl?.setValue(updatedSub);
        this.skillInput = '';
      },
      error: (err) => console.error('Failed to add skill:', err)
    });
  }

  removeSkill(skill: any): void {
    const subcategoryControl = this.subcategoryForm.get('subcategory');
    const subcategory = subcategoryControl?.value;

    if (!subcategory) return;

    this.skillsService.deleteSkill(skill.id).subscribe({
      next: () => {
        const updatedSkills = (subcategory.skills || []).filter(
          (s: any) => s.id !== skill.id
        );

        const updatedSub = {
          ...subcategory,
          skills: updatedSkills
        };

        subcategoryControl?.setValue(updatedSub);
      },
      error: (err) => console.error('Failed to remove skill:', err)
    });
  }


}
