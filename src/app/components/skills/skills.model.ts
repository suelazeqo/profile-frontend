export interface Skill {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
  skills: Skill[];
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}
export interface SkillsModalData {
  mode: 'create' | 'edit';
  selectedCategory?: Category;
  selectedSubcategory?: Subcategory;
  selectedSkills?: Skill[];
}
