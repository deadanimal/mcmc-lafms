export class License {
  public id: string;
  public name: string;
  public nric: string;
  public company_status: string;
  public address: string;
  public count_no: string;
  public general_description: string;
  public email: string;
  public signature: string;
  public fax: string;
  public mobile_number: string;
  public application_status: string;
  public office_number: string;
  public created_date: string;
  public modified_date: string;
  public company_name: string;
  public reg_date: string;
  public document1: string;
  public licence_type: string;
  public licence_details_type: string;
  public note: string;

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
    modified_date: string,
    company_status: string,
    application_status: string,
    count_no: string,
    email: string,
    company_name: string,
    reg_date: string,
    document1: string,
    licence_type: string,
    licence_details_type: string,
    note: string
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
    this.company_status = company_status;
    this.application_status = application_status;
    this.count_no = count_no;
    this.email = email;
    this.company_name = company_name;
    this.reg_date = reg_date;
    this.document1 = document1;
    this.licence_type = licence_type;
    this.licence_details_type = licence_details_type;
    this.note = note;
  }
}
