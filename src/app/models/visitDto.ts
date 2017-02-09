export interface VisitDTO {

  active: boolean;
  id: number;
  title: string;
  todos: Todos[];
}

export interface Todos {

  what: string;
  notes: string;
  link?: string;

}

