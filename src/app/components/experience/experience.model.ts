export interface Experience {
  id: number,
  startDate: string;
  endDate?: string;
  title: string;
  company:string;
  responsibilities: string[];
  skills: string[];
}
