import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { License } from "./license.model";

@Injectable({
  providedIn: "root",
})
export class LicenseService {
  // URL
  public urlLicense: string = environment.baseUrl + "v1/license/";

  // Data
  public License: License;
  // public Licenses: License[] = [];
  public LicenseFiltered: License[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<License> {
    console.log(this.urlLicense);
    console.log(body);
    return this.http.post<any>(this.urlLicense, body).pipe(
      tap((res) => {
        console.log("Licenses: ", res);
      })
    );
  }

  getAll(): Observable<License[]> {
    return this.http.get<License[]>(this.urlLicense).pipe(
      tap((res) => {
        console.log("Licenses: ", res);
      })
    );
  }

  getOne(id: String): Observable<License> {
    let urlLicenseOne = this.urlLicense + id + "/";
    return this.http.get<License>(urlLicenseOne).pipe(
      tap((res) => {
        console.log("License: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<License> {
    let urlLicenseOne = this.urlLicense + id + "/";
    console.log(urlLicenseOne);
    console.log(body);
    return this.http.put<License>(urlLicenseOne, body).pipe(
      tap((res) => {
        console.log("License", res);
      })
    );
  }

  filter(field: String): Observable<License[]> {
    let urlFilter = this.urlLicense + "?" + field + "/";
    return this.http.get<License[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Licenses", res);
      })
    );
  }
}
