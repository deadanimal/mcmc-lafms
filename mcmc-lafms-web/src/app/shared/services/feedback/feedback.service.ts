import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Form } from "@angular/forms";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Feedback } from "./feedback.model";

@Injectable({
  providedIn: "root",
})
export class FeedbacksService {
  // URL
  public urlFeedback: string = environment.baseUrl + "v1/feedbacks/";

  // Data
  public Feedback: Feedback;
  public Feedbacks: Feedback[] = [];
  public FeedbacksFiltered: Feedback[] = [];

  constructor(private http: HttpClient) {}

  create(body: Form): Observable<Feedback> {
    console.log(this.urlFeedback);
    console.log(body);
    return this.http.post<any>(this.urlFeedback, body).pipe(
      tap((res) => {
        console.log("Feedbacks: ", res);
      })
    );
  }

  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.urlFeedback).pipe(
      tap((res) => {
        console.log("Feedbacks: ", res);
      })
    );
  }

  getOne(id: String): Observable<Feedback> {
    let urlFeedbackOne = this.urlFeedback + id + "/";
    return this.http.get<Feedback>(urlFeedbackOne).pipe(
      tap((res) => {
        console.log("Feedback: ", res);
      })
    );
  }

  update(id: String, body: Form): Observable<Feedback> {
    let urlFeedbackOne = this.urlFeedback + id + "/";
    console.log(urlFeedbackOne);
    console.log(body);
    return this.http.put<Feedback>(urlFeedbackOne, body).pipe(
      tap((res) => {
        console.log("Feedback", res);
      })
    );
  }

  filter(field: String): Observable<Feedback[]> {
    let urlFilter = this.urlFeedback + "?" + field + "/";
    return this.http.get<Feedback[]>(urlFilter).pipe(
      tap((res) => {
        console.log("Feedbacks", res);
      })
    );
  }
}
