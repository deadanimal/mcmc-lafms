export class License {
  public id: string;
  public name: string;
  public nric: string;
  public address: string;
  public general_description: string;
  public signature: string;
  public office_number: string;
  public fax: string;
  public mobile_number: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    name: string,
    nric: string,
    address: string,
    general_description: string,
    signature: string,
    office_number: string,
    fax: string,
    mobile_number: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id;
    this.name = name;
    this.nric = nric;
    this.address = address;
    this.general_description = general_description;
    this.signature = signature;
    this.office_number = office_number;
    this.fax = fax;
    this.mobile_number = mobile_number;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
