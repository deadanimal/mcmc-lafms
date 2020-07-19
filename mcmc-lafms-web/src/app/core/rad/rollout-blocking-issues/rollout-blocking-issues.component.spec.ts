import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RolloutBlockingIssuesComponent } from "./rollout-blocking-issues.component";

describe("RolloutBlockingIssuesComponent", () => {
  let component: RolloutBlockingIssuesComponent;
  let fixture: ComponentFixture<RolloutBlockingIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolloutBlockingIssuesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloutBlockingIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
