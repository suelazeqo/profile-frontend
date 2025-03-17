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
