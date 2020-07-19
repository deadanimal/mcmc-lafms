import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Alert } from "./alert.model";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  // URL
  public urlAlert: string = environment.baseUrl + "v1/alert/";

  // Data
  public Alert: Alert;
  // public Alert: Alert[] = [];
  public AlertFiltered: Alert[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Alert> {
    console.log(this.urlAlert);
    console.log(body);
    return this.http.post<any>(this.urlAlert, body).pipe(
      tap((res) => {
        console.log("Alerts: ", res);
      })
    );
  }

  getAll(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.urlAlert).pipe(
      tap((res) => {
        console.log("Alerts: ", res);
      })
    );
  }

  getOne(id: String): Observable<Alert> {
    let urlAlertOne = this.urlAlert + id + "/";
    return this.http.get<Alert>(urlAlertOne).pipe(
      tap((res) => {
        console.log("Alert: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Alert> {
    let urlAlertOne = this.urlAlert + id + "/";
    console.log(urlAlertOne);
    console.log(body);
    return this.http.put<Alert>(urlAlertOne, body).pipe(
      tap((res) => {
        console.log("Alert", res);
      })
    );
  }

  filter(field: String): Observable<Alert[]> {
    let urlFilter = this.urlAlert + "?" + field + "/";
    return this.http.get<Alert[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Alerts", res);
      })
    );
  }
}
