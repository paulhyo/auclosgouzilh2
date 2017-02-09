export interface Activities {

  active: boolean;
  title: string;
  todos: Todos[];
}

export interface Todos {

  what: string;
  notes: string;
  link?: string;
  source?: string;

}
