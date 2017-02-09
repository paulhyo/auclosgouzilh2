export class VisitItem {
  constructor(
    public id: number,
    public visit_id: number,
    public title_fr: string,
    public title_de: string,
    public title_en: string,
    public notes_fr: string,
    public notes_de: string,
    public notes_en: string,
    public link: string,
    public source: string
  ){}
}
