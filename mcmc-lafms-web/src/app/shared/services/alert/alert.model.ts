export class Alert {
  public id: string;
  public name: string;
  public created_date: string;

  constructor(id: string, name: string, created_date: string) {
    this.id = id;
    this.name = name;
    this.created_date = created_date;
  }
}
