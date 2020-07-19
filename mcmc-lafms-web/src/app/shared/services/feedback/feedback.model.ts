export class Feedback {
  public id: string;
  public is_patient: string;
  public name: string;
  public mrn: string;
  public phone: string;
  public email: string;
  public patient_type: string;
  public created_date: string;
  public modified_date: string;
  public feedback_type: string;
  public feedback: string;

  public waiting_type: string;
  public is_acceptable: string;

  constructor(
    id: string,
    is_patient: string,
    name: string,
    mrn: string,
    phone: string,
    email: string,
    patient_type: string,
    created_date: string,
    modified_date: string,
    feedback_type: string,
    feedback: string,
    waiting_type: string,
    is_acceptable: string
  ) {
    this.id = id;
    this.is_patient = is_patient;
    this.name = name;
    this.mrn = mrn;
    this.phone = phone;
    this.email = email;
    this.patient_type = patient_type;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.feedback_type = feedback_type;
    this.feedback = feedback;
    this.waiting_type = waiting_type;
    this.is_acceptable = is_acceptable;
  }
}
