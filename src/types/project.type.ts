export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: 1604989757139;
}

export interface ProjectQueryForm {
  name: string;
  personId: string;
}
